import RequirementFulfillmentGraph from './requirement-graph';
import { HashMap } from './util/collections';

type BuildRequirementFulfillmentGraphParameters<
  Requirement,
  Course,
  UserChoiceOnFulfillmentStrategy
> = {
  /**
   * A list of applicable requirements in the system. e.g. if the user is CS major
   * in COE, then the list should contain all university requirements, COE requirements, and CS major
   * requirements.
   */
  readonly requirements: readonly Requirement[];
  /** A list of courses user inputted into course plan, regardless of semesters. */
  readonly userCourses: readonly Course[];
  /**
   * Some requirements might have several different ways to fulfill them. This is a list of objects
   * that describe user's choices. The exact shape of the object is opaque to function. The only way
   * for this function to use objects in this array is via
   * `getAllRelevantCoursesUnderFulfillmentStrategy`.
   */
  readonly userChoiceOnFulfillmentStrategy: readonly UserChoiceOnFulfillmentStrategy[];
  /**
   * A list of (requirement, course) tuple that describe how the user decides how a course is used to
   * satisfy requirements. Suppose a course c can be used to satisfy both r1 and r2, but the
   * requirements do not allow double counting, then a tuple (r1, c) means that we should keep the
   * (r1, c) edge in the graph and drop the (r2, c) edge.
   */
  readonly userChoiceOnDoubleCountingElimiation: readonly (readonly [Requirement, Course])[];
  /** See RequirementFulfillmentGraph for its usage. */
  readonly getRequirementUniqueID: (r: Requirement) => string;
  /** See RequirementFulfillmentGraph for its usage. */
  readonly getCourseUniqueID: (c: Course) => string;
  /**
   * Naively give a list of courses that can satisfy a requirement. Most of the time this function
   * should just return the pre-computed course list. For requirements have multiple fulfillment
   * strategies, it will return the union of all pre-computed course list.
   */
  readonly getAllCoursesThatCanPotentiallySatisfyRequirement: (
    requirement: Requirement
  ) => readonly Course[];
  /**
   * For a requirement with multiple fulfillment strategies, this function should return the list of
   * courses bind to one fulfillment strategies.
   */
  readonly getCorrespondingRequirementAndAllRelevantCoursesUnderFulfillmentStrategy: (
    choice: UserChoiceOnFulfillmentStrategy
  ) => {
    readonly correspondingRequirement: Requirement;
    readonly coursesOfChosenFulfillmentStrategy: Course[];
  };
};

const buildRequirementFulfillmentGraph = <Requirement, Course, UserChoiceOnFulfillmentStrategy>({
  requirements,
  userCourses,
  userChoiceOnFulfillmentStrategy,
  userChoiceOnDoubleCountingElimiation,
  getRequirementUniqueID,
  getCourseUniqueID,
  getAllCoursesThatCanPotentiallySatisfyRequirement,
  getCorrespondingRequirementAndAllRelevantCoursesUnderFulfillmentStrategy
}: BuildRequirementFulfillmentGraphParameters<
  Requirement,
  Course,
  UserChoiceOnFulfillmentStrategy
>): RequirementFulfillmentGraph<Requirement, Course> => {
  const graph = new RequirementFulfillmentGraph(getRequirementUniqueID, getCourseUniqueID);
  const userCourseSet = new HashMap<Course, null>(getCourseUniqueID);
  userCourses.forEach(course => userCourseSet.set(course, null));

  // Phase 1:
  //   Building a rough graph by naively connecting requirements and courses based on
  //   `getAllCoursesThatCanPotentiallySatisfyRequirement`.
  requirements.forEach(requirement => {
    getAllCoursesThatCanPotentiallySatisfyRequirement(requirement).forEach(course => {
      if (userCourseSet.has(course)) graph.addEdge(requirement, course);
    });
  });

  // Phase 2-1: Respect user's choices on fulfillment strategies.
  userChoiceOnFulfillmentStrategy.forEach(choice => {
    const {
      correspondingRequirement,
      coursesOfChosenFulfillmentStrategy
    } = getCorrespondingRequirementAndAllRelevantCoursesUnderFulfillmentStrategy(choice);
    const coursesToKeepSet = new HashMap<Course, null>(getCourseUniqueID);
    coursesOfChosenFulfillmentStrategy.forEach(course => coursesToKeepSet.set(course, null));

    graph.getConnectedCoursesFromRequirement(correspondingRequirement).forEach(connectedCourse => {
      if (!coursesToKeepSet.has(connectedCourse)) {
        graph.removeEdge(correspondingRequirement, connectedCourse);
      }
    });
  });

  // Phase 2-2:
  //   Auto-select fulfillment for requirements with multiple fulfillment strategies
  //   but without user choice.
  // TODO: not implemented.

  // Phase 3-1: Respect user's choices on double-counted courses.
  userChoiceOnDoubleCountingElimiation.forEach(([chosenRequirement, course]) => {
    const chosenRequirementUniqueID = getRequirementUniqueID(chosenRequirement);

    graph.getConnectedRequirementsFromCourse(course).forEach(connectedRequirement => {
      if (getRequirementUniqueID(connectedRequirement) !== chosenRequirementUniqueID) {
        graph.removeEdge(connectedRequirement, course);
      }
    });
  });

  // Phase 3-2: Auto-choose a requirement-course pair for double counted courses without user choice.
  // TODO: not implemented.
  // Important note for this phase: We need to support requirements that allow double counting.

  // Phase MAX_INT: PROFIT!
  return graph;
};

export default buildRequirementFulfillmentGraph;
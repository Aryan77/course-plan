<template>
  <course-base-tooltip
    v-if="hasCourseCautions"
    :isInformation="false"
    :hideVerticalBar="courseCautions.isPlaceholderWrongSemester"
  >
    <div v-if="singleWarning">
      <div v-if="courseCautions.noMatchedRequirement">
        This class is not matched to any requirement. Re-add this course to choose a requirement to
        bind to.
      </div>
      <div v-if="courseCautions.typicallyOfferedWarning">
        This class is typically offered in {{ courseCautions.typicallyOfferedWarning.join(', ') }}.
      </div>
      <div v-if="courseCautions.isCourseDuplicate">Duplicate</div>
      <div v-if="courseCautions.isPlaceholderWrongSemester">
        This requirement is suggested to be fulfilled in your
        {{ placeholderWarningSemesterText }} semester.
      </div>
    </div>
    <ul v-if="!singleWarning" class="warning-list">
      <li class="warning-item" v-if="courseCautions.noMatchedRequirement">
        This class is not matched to any requirement. Re-add this course to choose a requirement to
        bind to.
      </li>
      <li class="warning-item" v-if="courseCautions.typicallyOfferedWarning">
        This class is typically offered in {{ courseCautions.typicallyOfferedWarning.join(', ') }}.
      </li>
      <li class="warning-item" v-if="courseCautions.isCourseDuplicate">Duplicate</li>
      <li class="warning-item" v-if="courseCautions.isPlaceholderWrongSemester">
        This requirement is suggested to be fulfilled in your
        {{ placeholderWarningSemesterText }} semester.
      </li>
    </ul>
  </course-base-tooltip>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import CourseBaseTooltip from '@/components/Course/CourseBaseTooltip.vue';
import store from '@/store';
import { isPlaceholderCourse } from '@/utilities';

type CourseCautions = {
  readonly noMatchedRequirement: boolean;
  readonly typicallyOfferedWarning: readonly string[] | undefined;
  readonly isCourseDuplicate: boolean;
  readonly isPlaceholderWrongSemester: boolean;
};

const getCourseCautions = (
  course: FirestoreSemesterCourse | FirestoreSemesterPlaceholder,
  semesterIndex: number
): CourseCautions => {
  const {
    safeRequirementFulfillmentGraph,
    derivedCoursesData: { duplicatedCourseCodeSet, courseToSemesterMap },
  } = store.state;
  const noMatchedRequirement =
    !isPlaceholderCourse(course) &&
    safeRequirementFulfillmentGraph.getConnectedRequirementsFromCourse({
      uniqueId: course.uniqueID,
    }).length === 0;
  const semesterOfUserCourse = courseToSemesterMap[course.uniqueID];
  const typicallyOfferedWarning =
    !isPlaceholderCourse(course) &&
    semesterOfUserCourse != null &&
    course.semesters.length > 0 &&
    !course.semesters.includes(semesterOfUserCourse.season)
      ? course.semesters
      : undefined;
  const isCourseDuplicate =
    !isPlaceholderCourse(course) && duplicatedCourseCodeSet.has(course.code);
  const isPlaceholderWrongSemester =
    isPlaceholderCourse(course) &&
    ((!store.state.orderByNewest && semesterIndex !== course.startingSemester) ||
      (store.state.orderByNewest &&
        store.state.semesters.length - semesterIndex + 1 !== course.startingSemester));
  return {
    noMatchedRequirement,
    typicallyOfferedWarning,
    isCourseDuplicate,
    isPlaceholderWrongSemester,
  };
};

export default defineComponent({
  components: { CourseBaseTooltip },
  props: {
    course: {
      type: Object as PropType<FirestoreSemesterCourse | FirestoreSemesterPlaceholder>,
      required: true,
    },
    semesterIndex: { type: Number, required: false, default: 0 },
  },
  computed: {
    courseCautions(): CourseCautions {
      return getCourseCautions(this.course, this.semesterIndex);
    },
    hasCourseCautions(): boolean {
      const {
        noMatchedRequirement,
        typicallyOfferedWarning,
        isCourseDuplicate,
        isPlaceholderWrongSemester,
      } = this.courseCautions;
      return (
        noMatchedRequirement ||
        typicallyOfferedWarning != null ||
        isCourseDuplicate ||
        isPlaceholderWrongSemester
      );
    },
    singleWarning(): boolean {
      let warningCounter = 0;
      if (this.courseCautions.noMatchedRequirement) warningCounter += 1;
      if (this.courseCautions.typicallyOfferedWarning != null) warningCounter += 1;
      if (this.courseCautions.isCourseDuplicate) warningCounter += 1;
      if (this.courseCautions.isPlaceholderWrongSemester) warningCounter += 1;
      return warningCounter === 1;
    },
    placeholderWarningSemesterText(): string {
      if (isPlaceholderCourse(this.course)) {
        return this.formatOrdinals(this.course.startingSemester);
      }

      return '';
    },
  },
  methods: {
    formatOrdinals(n: number): string {
      const rules = new Intl.PluralRules('en-US', { type: 'ordinal' });

      const suffixes = new Map([
        ['one', 'st'],
        ['two', 'nd'],
        ['few', 'rd'],
        ['other', 'th'],
      ]);

      const rule = rules.select(n);
      const suffix = suffixes.get(rule);
      return `${n}${suffix}`;
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

ul.warning-list {
  list-style-type: circle;
  margin: 0;
  padding-left: 1rem;
}

li.warning-item {
  margin-left: 0;
  padding-left: -0.25rem;
}
</style>

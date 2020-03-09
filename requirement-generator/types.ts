export type Course = {
  readonly subject: string;
  readonly catalogNbr: string;
  readonly titleLong: string;
  readonly description: string;
  readonly catalogBreadth: string;
  readonly catalogDistr: string;
  readonly catalogLang: string;
  readonly catalogAttribute: string;
  readonly catalogWhenOffered: string;
  readonly catalogComments: string;
  readonly catalogSatisfiesReq: string;
  readonly acadCareer: string;
  readonly acadGroup: string;
};

export type RequirementSearch = keyof Course | 'all' | 'self-check' | 'all-eligible' | 'code';

export interface BaseRequirement {
  readonly name: string;
  readonly description: string;
  readonly source: string;
  readonly search?: readonly RequirementSearch[];
  readonly includes?: readonly string[][];
  readonly excludes?: readonly string[][];
  readonly fulfilledBy: 'credits' | 'courses' | 'self-check';
  readonly applies?: string;
  readonly minCount?: number;
  readonly progressBar?: boolean;
}

export interface UniversityRequirement extends BaseRequirement {
  readonly includes: readonly string[][];
  readonly minCount: number;
}

export type UniversityRequirements = {
  readonly value: string;
  readonly name: string;
  readonly requirements: readonly UniversityRequirement[];
};

export interface CollegeOrMajorRequirement extends BaseRequirement {
  readonly includes: readonly string[][];
}

export interface DecoratedCollegeOrMajorRequirement extends BaseRequirement {
  readonly courses: 'all-eligible' | readonly string[];
}

export type CollegeRequirements<R> = {
  readonly [collegeCode: string]: {
    readonly name: string;
    readonly requirements: readonly R[];
  };
};

export type MajorRequirements<R> = {
  readonly [collegeCode: string]: {
    readonly name: string;
    readonly schools: readonly string[];
    readonly requirements: readonly R[];
  };
};

export type RequirementsJson = {
  readonly university: UniversityRequirements;
  readonly college: CollegeRequirements<CollegeOrMajorRequirement>;
  readonly major: MajorRequirements<CollegeOrMajorRequirement>;
};

export type DecoratedRequirementsJson = {
  readonly university: UniversityRequirements;
  readonly college: CollegeRequirements<DecoratedCollegeOrMajorRequirement>;
  readonly major: MajorRequirements<DecoratedCollegeOrMajorRequirement>;
};
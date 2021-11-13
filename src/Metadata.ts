interface IVersion {
  [key: string]: Version;
}

interface Dist {
  shasum: string;
  tarball: string;
}

interface Version {
  dist: Dist;
}

/** @see {isMetadata} ts-auto-guard:type-guard */
export interface Metadata {
  "dist-tags": {
    latest: string;
  };
  versions: IVersion;
}

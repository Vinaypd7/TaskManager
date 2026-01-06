export const fetchAndActivate = async (_rc?: any) => true;

export const getValue = (_rc: any, _key: string) => ({
  asBoolean: () => false,
});

export const getRemoteConfig = (_app?: any) => {
  const rc: any = {
    settings: { minimumFetchIntervalMillis: 3600000 },
    defaultConfig: {},
  };
  return rc;
};

import { useEffect, useState } from "react";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import { remoteConfig } from "../config/firebase";

export const useFeatureFlags = (flagName: string) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const loadFlag = async () => {
      try {
        await fetchAndActivate(remoteConfig);
        const flag = getValue(remoteConfig, flagName).asBoolean();
        setEnabled(flag);
      } catch (e) {
        console.log("Remote config error:", e);
        setEnabled(false);
      }
    };

    loadFlag();
  }, [flagName]);

  return enabled;
};

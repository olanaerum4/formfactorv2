"use client";
import { useState, useEffect } from "react";
import { getAthlete, type Athlete } from "./athlete";
import { USER } from "@/app/store"; // fallback defaults

export interface AthleteData {
  name: string;
  goal: string;
  pr5k: string;
  maxHR: number;
  vdot: number;
  trainingDays: number;
  // PMC (from Strava sync)
  ctl: number;
  atl: number;
  tsb: number;
  weekTSS: number;
  streak: number;
  loaded: boolean;
  hasProfile: boolean;
}

const DEFAULTS: AthleteData = {
  name: USER.name,
  goal: USER.goal,
  pr5k: USER.pr5k,
  maxHR: USER.maxHR,
  vdot: USER.vdot,
  trainingDays: 5,
  ctl: USER.ctl,
  atl: USER.atl,
  tsb: USER.tsb,
  weekTSS: USER.weekTSS,
  streak: USER.streak,
  loaded: false,
  hasProfile: false,
};

export function useAthlete() {
  const [data, setData] = useState<AthleteData>(DEFAULTS);

  useEffect(() => {
    async function load() {
      try {
        const athlete = await getAthlete();

        if (!athlete) {
          setData(d => ({ ...d, loaded: true, hasProfile: false }));
          return;
        }

        // Fetch PMC from Strava sync
        let pmc = { ctl: USER.ctl, atl: USER.atl, tsb: USER.tsb };
        try {
          const res = await fetch("/api/strava/sync");
          if (res.ok) {
            const json = await res.json();
            if (json.metrics) pmc = json.metrics;
          }
        } catch {}

        setData({
          name: athlete.name || "Athlete",
          goal: athlete.goal || USER.goal,
          pr5k: athlete.pr_5k || USER.pr5k,
          maxHR: athlete.max_hr || USER.maxHR,
          vdot: athlete.vdot || USER.vdot,
          trainingDays: athlete.training_days || 5,
          ctl: pmc.ctl,
          atl: pmc.atl,
          tsb: pmc.tsb,
          weekTSS: USER.weekTSS,
          streak: USER.streak,
          loaded: true,
          hasProfile: true,
        });
      } catch (e) {
        console.error("useAthlete error:", e);
        setData(d => ({ ...d, loaded: true }));
      }
    }
    load();
  }, []);

  return data;
}

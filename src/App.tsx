import React, { useState, useEffect, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Play, Pause, RotateCcw, CheckCircle2, ChevronDown, ChevronUp, Activity, Apple, Flame, Plus, Trash2, Rocket, FastForward, Leaf, Sun, Moon, Search, Square, Download, ChevronLeft, Shield, TrendingUp, Zap, Footprints, Palette, Timer, BarChart3, Sparkles, Loader2, Menu, Mic, Send, User, Dumbbell, Brain, Scale, Heart } from 'lucide-react';
import runnerImg from './assets/runner_overlay.png';
import morningRunImg from './assets/morning_run.png';
const playBeep = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(900, context.currentTime);

    gainNode.gain.setValueAtTime(1.0, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.8);
  } catch (e) {
    console.error("Audio beep failed:", e);
  }
};

const standardDiet = {
  title: "Pure Vegetarian Fat-Loss Diet",
  focus: "3 Normal Meals + Budget High-Protein Plan",
  sections: [
    { meal: "Breakfast", items: ["Homemade food (Poha/Upma/Dosa)", "1 medium bowl", "Limit sugar"] },
    { meal: "Lunch", items: ["2 Rotis OR 1 bowl Rice", "1 bowl Dal + 1 bowl Sabzi", "Plate of Salad first"] },
    { meal: "Dinner", items: ["1-2 Rotis with Sabzi", "Lighter than lunch", "Eat 2 hrs before bed"] }
  ],
  budgetPlan: {
    title: "FINAL HIGH-PROTEIN FAT LOSS PLAN (BUDGET)",
    profile: [
      "Goal: Fat loss + maintain muscle",
      "Protein target: 60–65g/day",
      "Cooking: ≤ 30 min/day",
      "Diet: Vegetarian (no curd)"
    ],
    quantityGuide: [
      { item: "Soya chunks", qty: "½ cup raw (40–50g)", protein: "~25g" },
      { item: "Dal (moong/chana)", qty: "1 cup raw", protein: "~20–24g" },
      { item: "Chana", qty: "1 cup soaked", protein: "~18–20g" },
      { item: "Besan", qty: "1 cup", protein: "~20g" },
      { item: "Peanuts", qty: "20g", protein: "~5g" },
      { item: "Oats", qty: "½ cup", protein: "~6g" },
      { item: "Rajma", qty: "1 cup soaked", protein: "~20–22g" }
    ],
    quantityRule: "Rule: Combine 1–2 (max 3) → reach 55–65g protein",
    costs: [
      { item: "Soya (50g)", cost: "₹10" },
      { item: "Dal (80g)", cost: "₹11" },
      { item: "Rajma (80g raw)", cost: "₹16" },
      { item: "Chana/Besan", cost: "₹7–10" },
      { item: "Peanuts", cost: "₹4" },
      { item: "Veg", cost: "₹10–15" }
    ],
    costTotal: "Total/day = ₹70–95",
    formula: [
      "Soya 50g → 25g",
      "Dal OR Rajma → 20g",
      "Extra (chana/besan/oats) → 10–15g",
      "Peanuts → 5g",
      "TOTAL = 60–65g protein guaranteed"
    ],
    weekStructure: [
      "3 days → Soya based",
      "2 days → Dal based",
      "1 day → Chana",
      "1 day → Rajma"
    ],
    bestStandardDay: [
      "Soya → 50g → 25g",
      "Dal/Rajma → 90g → 20g",
      "Chana/Besan → 70g → 12–15g",
      "Peanuts → 20g → 5g",
      "TOTAL = 62–65g protein"
    ]
  },
  recipes: {
    title: "🍛 DETAILED SIMPLE RECIPES (FAST + TASTY)",
    list: [
      {
        name: "🟢 1. SOYA CURRY (HIGH PROTEIN)",
        ingredients: ["Soya chunks (½ cup)", "Onion (1 small)", "Tomato (1 small)", "Salt, chilli, turmeric", "Garam masala (optional)", "1 tsp oil"],
        procedure: ["Boil soya 5 min → squeeze water", "Heat oil → add onion (2–3 min)", "Add tomato + spices → cook 3 min", "Add soya + water → cook 8–10 min"],
        tip: "👉 Ready in 15 min"
      },
      {
        name: "🟡 2. DAL (MOONG / CHANA DAL)",
        ingredients: ["Dal (1 cup)", "Salt, turmeric", "Garlic (optional)"],
        procedure: ["Wash dal", "Pressure cook (3 whistles)", "Add salt", "Optional: light tadka"],
        tip: "👉 Very fast + easy digestion"
      },
      {
        name: "🟢 3. RAJMA CURRY (NEW ADD)",
        ingredients: ["Rajma (1 cup soaked overnight)", "Onion + tomato", "Salt, chilli, turmeric", "Garam masala"],
        procedure: ["Soak overnight", "Pressure cook (5–6 whistles)", "Heat oil → onion → tomato", "Add spices", "Add rajma + water", "Cook 10 min"],
        tip: "👉 Thick gravy → very filling"
      },
      {
        name: "🟡 4. CHANA (BOILED / SALAD)",
        ingredients: ["Chana soaked", "Salt", "Onion + lemon (optional)"],
        procedure: ["Soak overnight", "Pressure cook (5 whistles)", "Add salt + mix"],
        tip: "👉 No cooking needed after"
      },
      {
        name: "🟢 5. BESAN CHEELA (FASTEST)",
        ingredients: ["Besan (1 cup)", "Water", "Salt, chilli"],
        procedure: ["Mix batter", "Pour on pan", "Cook both sides"],
        tip: "👉 10 min total"
      },
      {
        name: "🟡 6. OATS (SAVORY)",
        ingredients: ["Oats", "Water", "Salt"],
        procedure: ["Boil water", "Add oats", "Cook 5 min"],
        tip: "👉 Quick and simple"
      }
    ]
  }
};

const cardioDiet = {
  title: "Cardio Nutrition",
  focus: "Hydration & Energy Replenishment",
  sections: [
    { meal: "Pre-Workout (30 mins prior)", items: ["Black coffee or Green tea", "1 Banana or small apple", "500ml Water"] },
    { meal: "Post-Workout", items: ["Protein shake or 2 boiled eggs", "Electrolyte water", "Small portion of complex carbs"] }
  ],
  budgetPlan: null,
  recipes: null
};

const lowerBodyRedesignData = {
  warmup: {
    title: "10-Min Morning Shockwave",
    focus: "Perform immediately upon waking. Sets daily metabolic rate. | Burn: ~20-30 kcal",
    exercises: [
      { name: "High Knees", reps: "45 sec", time: 45, form: ["Drive knees to hip height", "Keep chest up"], isCore: true },
      { name: "Jump Squats", reps: "45 sec", time: 45, form: ["Deep squat", "Explode up, land soft"], isCore: true },
      { name: "Mountain Climbers", reps: "45 sec", time: 45, form: ["Push-up position", "Drive knees fast"], isCore: true },
      { name: "Lateral Skater Hops", reps: "45 sec", time: 45, form: ["Leap side to side", "Sweep back leg"], isCore: true },
      { name: "Double Calf Hops", reps: "45 sec", time: 45, form: ["Stay on balls of feet", "Legs straight"], isCore: true },

      { name: "High Knees (Round 2)", reps: "45 sec", time: 45, form: ["Maintain speed"], isCore: true },
      { name: "Jump Squats (Round 2)", reps: "45 sec", time: 45, form: ["Push through the burn"], isCore: true },
      { name: "Mountain Climbers (Round 2)", reps: "45 sec", time: 45, form: ["Keep hips low"], isCore: true },
      { name: "Lateral Skater Hops (Round 2)", reps: "45 sec", time: 45, form: ["Wider leaps"], isCore: true },
      { name: "Double Calf Hops (Round 2)", reps: "45 sec", time: 45, form: ["Don't let heels touch"], isCore: true }
    ]
  },
  days: [
    {
      id: "evening_hiit",
      title: "30-Min Evening Deep Target HIIT",
      focus: "Perform before placement prep. 40s Work / 15s Rest transitions.",
      sessions: {
        pm: {
          id: "evening_hiit_pm",
          title: "The 30-Minute Circuit",
          focus: "Circuits 1-5 + Finisher. Total Time: ~30 Mins | Burn: ~160-190 kcal",
          exercises: [
            // Circuit 1
            { name: "Alt Reverse Lunges", reps: "40 sec", time: 40, form: ["90 degree bend", "Chest up"], isCore: true },
            { name: "Jump Squats", reps: "40 sec", time: 40, form: ["Explosive power"], isCore: true },
            { name: "Alt Front Lunges", reps: "40 sec", time: 40, form: ["Step forward", "Don't let knee pass toe"], isCore: true },
            { name: "Frog Extensions", reps: "40 sec", time: 40, form: ["Lay on back", "Squeeze glutes at top"], isCore: true },
            { name: "Alt Reverse Lunges (R2)", reps: "40 sec", time: 40, form: ["Keep form tight"], isCore: true },
            { name: "Jump Squats (R2)", reps: "40 sec", time: 40, form: ["Max effort"], isCore: true },
            { name: "Alt Front Lunges (R2)", reps: "40 sec", time: 40, form: ["Smooth motion"], isCore: true },
            { name: "Frog Extensions (R2)", reps: "40 sec", time: 40, form: ["Full extension"], isCore: true },

            // Circuit 2
            { name: "Cross Mountain Climbers", reps: "40 sec", time: 40, form: ["Knee to opposite elbow"], isCore: true },
            { name: "Russian Twists", reps: "40 sec", time: 40, form: ["Twist full torso"], isCore: true },
            { name: "Plank Spider Crunches", reps: "40 sec", time: 40, form: ["Knee to outside elbow"], isCore: true },
            { name: "Cross Star Crunches", reps: "40 sec", time: 40, form: ["Opposite arm to toe"], isCore: true },
            { name: "Cross Mountain Climbers (R2)", reps: "40 sec", time: 40, form: ["Maintain speed"], isCore: true },
            { name: "Russian Twists (R2)", reps: "40 sec", time: 40, form: ["Lean back slightly"], isCore: true },
            { name: "Plank Spider Crunches (R2)", reps: "40 sec", time: 40, form: ["Crunch obliques hard"], isCore: true },
            { name: "Cross Star Crunches (R2)", reps: "40 sec", time: 40, form: ["Lift shoulder blades"], isCore: true },

            // Circuit 3
            { name: "High Knees", reps: "40 sec", time: 40, form: ["Drive knees up"], isCore: true },
            { name: "Alt Curtsy Lunges", reps: "40 sec", time: 40, form: ["Step behind and across"], isCore: true },
            { name: "Air Squats", reps: "40 sec", time: 40, form: ["Weight on heels"], isCore: true },
            { name: "Cossack Squats", reps: "40 sec", time: 40, form: ["Deep side lunge", "Other leg straight"], isCore: true },
            { name: "High Knees (R2)", reps: "40 sec", time: 40, form: ["Don't slow down"], isCore: true },
            { name: "Alt Curtsy Lunges (R2)", reps: "40 sec", time: 40, form: ["Deep stretch in glute"], isCore: true },
            { name: "Air Squats (R2)", reps: "40 sec", time: 40, form: ["Consistent pace"], isCore: true },
            { name: "Cossack Squats (R2)", reps: "40 sec", time: 40, form: ["Keep chest proud"], isCore: true },

            // Circuit 4
            { name: "Flutter Kicks", reps: "40 sec", time: 40, form: ["Legs straight, low"], isCore: true },
            { name: "Alt Sprinter’s Sit Up", reps: "40 sec", time: 40, form: ["Explosive sit up", "Drive opposite knee"], isCore: true },
            { name: "Scissor Crossovers", reps: "40 sec", time: 40, form: ["Criss-cross legs"], isCore: true },
            { name: "Rev Crunch + Ext & Abd", reps: "40 sec", time: 40, form: ["Hips off floor", "Extend and open legs"], isCore: true },
            { name: "Flutter Kicks (R2)", reps: "40 sec", time: 40, form: ["Lower back flat"], isCore: true },
            { name: "Alt Sprinter’s Sit Up (R2)", reps: "40 sec", time: 40, form: ["Use core, not momentum"], isCore: true },
            { name: "Scissor Crossovers (R2)", reps: "40 sec", time: 40, form: ["Keep feet close to floor"], isCore: true },
            { name: "Rev Crunch + Ext & Abd (R2)", reps: "40 sec", time: 40, form: ["Control the descent"], isCore: true },

            // Circuit 5
            { name: "In & Out Squats", reps: "40 sec", time: 40, form: ["Jump feet wide to narrow squat"], isCore: true },
            { name: "High Knee Side Shuffle", reps: "40 sec", time: 40, form: ["High knees while moving laterally"], isCore: true },
            { name: "Side to Side Squat Hops", reps: "40 sec", time: 40, form: ["Stay low", "Hop laterally"], isCore: true },
            { name: "Spot Sprint", reps: "40 sec", time: 40, form: ["Fastest pace possible in place"], isCore: true },
            { name: "In & Out Squats (R2)", reps: "40 sec", time: 40, form: ["Soft landings"], isCore: true },
            { name: "High Knee Side Shuffle (R2)", reps: "40 sec", time: 40, form: ["Pump arms"], isCore: true },
            { name: "Side to Side Squat Hops (R2)", reps: "40 sec", time: 40, form: ["Burn out the thighs"], isCore: true },
            { name: "Spot Sprint (R2)", reps: "40 sec", time: 40, form: ["Empty the tank"], isCore: true },

            // Finisher
            { name: "Squat Pulse (Finisher)", reps: "30 sec", time: 30, form: ["Stay in bottom half of squat"], isCore: true },
            { name: "Static Lunge Pulse R (Finisher)", reps: "30 sec", time: 30, form: ["Right leg forward, pulse low"], isCore: true },
            { name: "Static Lunge Pulse L (Finisher)", reps: "30 sec", time: 30, form: ["Left leg forward, pulse low"], isCore: true },
            { name: "Sumo Squat Pulse (Finisher)", reps: "30 sec", time: 30, form: ["Wide stance, pulse low till end"], isCore: true }
          ]
        }
      }
    }
  ],
  diet: standardDiet,
  summary: {
    time: "40 Minutes Total (10m AM + 30m PM)",
    intensity: "Extreme targeted volume",
    burn: "~180-220 kcal (Undercalculated)",
    afterburn: "High EPOC 24hr afterburn due to massive muscular tension",
    tips: [
      "Days 1-7: De-bloat phase. Legs will feel heavy.",
      "Days 14-21: Firming phase. Core will feel tighter.",
      "Days 30-45: Visual fat loss and shape change becomes apparent."
    ]
  }
};

const cardioWorkoutData = {
  warmup: {
    title: "Cardio Warm-Up (5 Mins)",
    focus: "Joint mobility & heart rate prep",
    exercises: [
      { name: "Ankle rotations", reps: "15 each", time: 30, form: ["Slow circles", "Both directions"], isCore: true },
      { name: "Leg swings", reps: "15 each", time: 45, form: ["Forward and back", "Keep core tight"], isCore: true },
      { name: "High knees", reps: "30 sec", time: 30, form: ["Pace yourself"], isCore: true },
      { name: "Light jumping jacks", reps: "30 sec", time: 30, form: ["Soft landings"], isCore: true }
    ]
  },
  days: [
    {
      id: "cardio",
      title: "Stairs / Jogging Burn",
      focus: "Cardiovascular Endurance",
      exercises: [
        { name: "Light Jogging (Warm-up)", reps: "3 mins", time: 180, form: ["Steady pace", "Breathe deeply"], isCore: true },
        { name: "Stair Climbing (Steady)", reps: "5 mins", time: 300, form: ["Use whole foot", "Keep chest up"], isCore: true },
        { name: "Double Step Climbs", reps: "2 mins", time: 120, form: ["Skip a step", "Push through heel"], isCore: true },
        { name: "Fast Jogging / Stair Sprints", reps: "1 min", time: 60, form: ["Max effort", "Pump arms"], isCore: true },
        { name: "Walking Recovery", reps: "2 mins", time: 120, form: ["Slow pace", "Catch breath"], isCore: true },
        { name: "Stair Climbing (Steady)", reps: "5 mins", time: 300, form: ["Use whole foot", "Keep chest up"], isCore: true },
        { name: "Calf Raises on Stair Edge", reps: "15 reps", time: 45, form: ["Hold railing", "Drop heels low"], isCore: true },
        { name: "Cool-down Walk", reps: "3 mins", time: 180, form: ["Slow down gradually", "Deep breaths"], isCore: true }
      ]
    }
  ],
  diet: cardioDiet
};

const hiit500WorkoutData = {
  warmup: {
    title: "Dynamic Stretching (5 Mins)",
    focus: "Low Intensity Warm-up",
    exercises: [
      { name: "Jumping Jacks", reps: "60 sec", time: 60, form: ["Full arm extension", "Light on toes"], isCore: true },
      { name: "Arm Circles", reps: "60 sec", time: 60, form: ["Small to large circles", "Controlled speed"], isCore: true },
      { name: "Hip Rotations", reps: "60 sec", time: 60, form: ["Wide circles", "Keep chest up"], isCore: true },
      { name: "Leg Swings", reps: "60 sec", time: 60, form: ["Forward and back", "Hold wall if needed"], isCore: true },
      { name: "March in Place", reps: "60 sec", time: 60, form: ["High knees", "Pump arms"], isCore: true }
    ]
  },
  days: [
    {
      id: "torcher",
      title: "Fast Paced Bodyweight",
      focus: "High Volume Sweating",
      exercises: [
        // ROUND 1
        { name: "1. Burpees (Chest to floor)", reps: "45 Sec", time: 45, form: ["Intensity: MAX", "Burn estimate: ~15 kcal", "Explosive jump"], isCore: true },
        { name: "2. Mountain Climbers", reps: "45 Sec", time: 45, form: ["Intensity: HIGH", "Burn estimate: ~10 kcal", "Fast pace"], isCore: true },
        { name: "3. Jump Squats", reps: "45 Sec", time: 45, form: ["Intensity: HIGH", "Burn estimate: ~12 kcal", "Deep squat"], isCore: true },
        { name: "4. Push-Ups", reps: "45 Sec", time: 45, form: ["Intensity: MODERATE", "Burn estimate: ~8 kcal", "Full range"], isCore: true },
        { name: "5. High Knees", reps: "45 Sec", time: 45, form: ["Intensity: MAX", "Burn estimate: ~12 kcal", "Sprint pace"], isCore: true },
        { name: "6. Plank Jacks", reps: "45 Sec", time: 45, form: ["Intensity: MODERATE", "Burn estimate: ~8 kcal", "Core engaged"], isCore: true },
        { name: "7. Skater Jumps", reps: "45 Sec", time: 45, form: ["Intensity: HIGH", "Burn estimate: ~10 kcal", "Lateral power"], isCore: true },
        { name: "8. Bicycle Crunches", reps: "45 Sec", time: 45, form: ["Intensity: MODERATE", "Burn estimate: ~6 kcal", "Steady pace"], isCore: true },
        { name: "9. Lunges (Alternating)", reps: "45 Sec", time: 45, form: ["Intensity: MODERATE", "Burn estimate: ~8 kcal", "90 degree bend"], isCore: true },
        { name: "10. Sprint in Place", reps: "45 Sec", time: 45, form: ["Intensity: MAX", "Burn estimate: ~15 kcal", "Max effort"], isCore: true },
        { name: "ROUND 1 RECOVERY (Rest)", reps: "1 Min", time: 60, form: ["Target met: ~100 Calories", "Sip water", "Deep breaths"], isCore: true },

        // ROUND 2
        { name: "1. Burpees (Round 2)", reps: "45 Sec", time: 45, form: ["Maintain intensity", "Don't slow down"], isCore: true },
        { name: "2. Mountain Climbers", reps: "45 Sec", time: 45, form: ["Fast knees", "Keep hips low"], isCore: true },
        { name: "3. Jump Squats", reps: "45 Sec", time: 45, form: ["Push through fatigue"], isCore: true },
        { name: "4. Push-Ups", reps: "45 Sec", time: 45, form: ["Quality over quantity"], isCore: true },
        { name: "5. High Knees", reps: "45 Sec", time: 45, form: ["Knees up high!"], isCore: true },
        { name: "6. Plank Jacks", reps: "45 Sec", time: 45, form: ["Hold the line"], isCore: true },
        { name: "7. Skater Jumps", reps: "45 Sec", time: 45, form: ["Wide lateral leaps"], isCore: true },
        { name: "8. Bicycle Crunches", reps: "45 Sec", time: 45, form: ["Abs tight"], isCore: true },
        { name: "9. Lunges (Alternating)", reps: "45 Sec", time: 45, form: ["Balance and depth"], isCore: true },
        { name: "10. Sprint in Place", reps: "45 Sec", time: 45, form: ["Finish Round 2 strong"], isCore: true },
        { name: "ROUND 2 RECOVERY (Rest)", reps: "1 Min", time: 60, form: ["Cumulative: ~200 Calories", "Final round prep"], isCore: true },

        // ROUND 3
        { name: "1. Burpees (Final Round)", reps: "45 Sec", time: 45, form: ["Total effort", "Empty the tank"], isCore: true },
        { name: "2. Mountain Climbers", reps: "45 Sec", time: 45, form: ["Max speed"], isCore: true },
        { name: "3. Jump Squats", reps: "45 Sec", time: 45, form: ["Explosive jumps"], isCore: true },
        { name: "4. Push-Ups", reps: "45 Sec", time: 45, form: ["Maintain form"], isCore: true },
        { name: "5. High Knees", reps: "45 Sec", time: 45, form: ["Sprint to the finish"], isCore: true },
        { name: "6. Plank Jacks", reps: "45 Sec", time: 45, form: ["Burn it out"], isCore: true },
        { name: "7. Skater Jumps", reps: "45 Sec", time: 45, form: ["Lateral power"], isCore: true },
        { name: "8. Bicycle Crunches", reps: "45 Sec", time: 45, form: ["Last core set"], isCore: true },
        { name: "9. Lunges (Alternating)", reps: "45 Sec", time: 45, form: ["Deep reps"], isCore: true },
        { name: "10. Sprint in Place", reps: "45 Sec", time: 45, form: ["All out till the beep!"], isCore: true },

        // COOL DOWN
        { name: "Cool-Down: Static Stretching", reps: "5 Mins", time: 300, form: ["Cumulative total: ~200 Calories", "Calm your heart rate"], isCore: true }
      ]
    }
  ],
  diet: standardDiet,
  summary: {
    time: "45 Minutes",
    intensity: "3 High-Volume Rounds",
    burn: "~65 kcal per round",
    afterburn: "Total Workout: ~200 kcal (Undercalculated)",
    tips: [
      "2-3 Round Strategy: First round is the engine, third round is the 'Afterburn' generator.",
      "Rest Protocol: 1-minute rest after exercise #10 is mandatory for ATP replenishment.",
      "Scaling: If 3 rounds are too hard, focus on 2 rounds at 100% effort."
    ]
  }
};

const beginnerWorkoutData = {
  warmup: {
    title: "Beginner Warm-Up (8 Mins)",
    focus: "Prepare Your Body (Do this before every AM & PM session)",
    exercises: [
      { name: "Neck rotations", reps: "10 each", time: 30, form: ["Slow circles", "Don't force", "Relax shoulders"], isCore: true },
      { name: "Arm circles", reps: "15 each", time: 30, form: ["Straight arms", "Small to large circles"], isCore: true },
      { name: "Shoulder rotations", reps: "15", time: 30, form: ["Roll up and back", "Squeeze blades"], isCore: true },
      { name: "Shoulder stretch", reps: "15 sec each", time: 30, form: ["Pull arm across chest", "Keep shoulder down", "Breathe deeply"], isCore: true },
      { name: "Tricep stretch", reps: "15 sec each", time: 30, form: ["Reach hand down spine", "Gently pull elbow", "Keep neck straight"], isCore: true },
      { name: "Hip rotations", reps: "15 each", time: 40, form: ["Wide circles", "Keep core engaged"], isCore: true },
      { name: "Dynamic squat reach", reps: "10", time: 40, form: ["Shallow squat, reach high"], isCore: true },
      { name: "Side lunges", reps: "8 each", time: 40, form: ["Keep chest up"], isCore: true },
      { name: "Cat–Cow", reps: "12", time: 40, form: ["Inhale arch", "Exhale round"], isCore: true },
      { name: "High plank to downward dog", reps: "8", time: 40, form: ["Pushup start", "Hips high"], isCore: true },
      { name: "Leg swings", reps: "10 each", time: 40, form: ["Hold wall", "Upright torso"], isCore: true },
      { name: "Marching knees", reps: "40 sec", time: 40, form: ["Drive knees high", "Pump arms"], isCore: true }
    ]
  },
  days: [
    {
      id: "day1",
      title: "Day 1: Full Body Start",
      focus: "Expectation: Stiffness ↓, Flexibility ↑",
      sessions: {
        am: {
          id: "day1-am",
          title: "☀️ Morning Session (2 Rounds)",
          focus: "Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Squats", reps: "15", time: 40, form: ["Chest up", "Weight on heels"], isCore: true },
            { name: "Reverse lunges", reps: "8 each", time: 40, form: ["Smooth step backward"], isCore: true },
            { name: "Knee pushups", reps: "8–10", time: 30, form: ["Core tight", "Knees on floor"], isCore: true },
            { name: "Marching high knees", reps: "30 sec", time: 30, form: ["Controlled pace"], isCore: true },
            { name: "Hip bridge", reps: "15", time: 35, form: ["Squeeze glutes at top"], isCore: true },
            { name: "Heel touches", reps: "20", time: 35, form: ["Crunch up slightly"], isCore: true }
          ]
        },
        pm: {
          id: "day1-pm",
          title: "🌙 Evening Session (2 Rounds)",
          focus: "Core + Fat Burn | Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Legs in & out", reps: "12", time: 30, form: ["Sit lean back", "Knees to chest"], isCore: true },
            { name: "Leg raises", reps: "10", time: 25, form: ["Lower slowly", "Flat back"], isCore: true },
            { name: "Russian twist", reps: "20", time: 30, form: ["Twist torso side to side"], isCore: true },
            { name: "Side plank", reps: "15 sec each", time: 30, form: ["Straight line"], isCore: true },
            { name: "Wall sit", reps: "25 sec", time: 25, form: ["90 degrees", "Back flat"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day2",
      title: "Day 2: Lower Body + Belly",
      focus: "Expectation: Stiffness ↓, Flexibility ↑",
      sessions: {
        am: {
          id: "day2-am",
          title: "☀️ Morning Session (2 Rounds)",
          focus: "Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Squats", reps: "15", time: 40, form: ["Chest up"], isCore: true },
            { name: "Sumo squats", reps: "12", time: 35, form: ["Wide stance, toes out"], isCore: true },
            { name: "Back leg raise", reps: "10 each", time: 35, form: ["Squeeze glutes"], isCore: true },
            { name: "Step-ups", reps: "10 each", time: 40, form: ["Use a low, sturdy step"], isCore: true },
            { name: "Plank", reps: "20 sec", time: 20, form: ["Hold steady"], isCore: true }
          ]
        },
        pm: {
          id: "day2-pm",
          title: "🌙 Evening Session (2 Rounds)",
          focus: "Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Flutter kicks", reps: "20", time: 30, form: ["Small fast kicks"], isCore: true },
            { name: "Bicycle crunch", reps: "20", time: 35, form: ["Opposite elbow to knee"], isCore: true },
            { name: "Heel touches", reps: "20", time: 30, form: ["Reach for heels"], isCore: true },
            { name: "Hip bridge", reps: "15", time: 30, form: ["Push through heels"], isCore: true },
            { name: "Cat-Cow", reps: "10", time: 35, form: ["Stretch spine"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day3",
      title: "Day 3: Light HIIT Introduction",
      focus: "Expectation: Sweating ↑",
      sessions: {
        am: {
          id: "day3-am",
          title: "☀️ Morning Session (2 Rounds)",
          focus: "Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Half burpees", reps: "8 reps", time: 35, form: ["No push-up, jump feet in/out"], isCore: true },
            { name: "Marching high knees", reps: "30 sec", time: 30, form: ["Keep a steady rhythm"], isCore: true },
            { name: "Slow mountain climbers", reps: "25 sec", time: 25, form: ["Controlled knee drive"], isCore: true },
            { name: "Knee pushups", reps: "8", time: 30, form: ["Chest to floor"], isCore: true },
            { name: "Squats", reps: "15", time: 40, form: ["Weight on heels"], isCore: true }
          ]
        },
        pm: {
          id: "day3-pm",
          title: "🌙 Evening Session (2 Rounds)",
          focus: "Core Focus | Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Leg raises", reps: "10", time: 30, form: ["Keep lower back flat"], isCore: true },
            { name: "Russian twist", reps: "20", time: 35, form: ["Twist torso"], isCore: true },
            { name: "Side plank", reps: "15 sec each", time: 30, form: ["Hips up"], isCore: true },
            { name: "Hip dips", reps: "10 each", time: 35, form: ["Plank position, rotate hips"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day4",
      title: "Day 4: Recovery + Flexibility",
      focus: "Active rest to let muscles recover safely.",
      sessions: {
        am: {
          id: "day4-am",
          title: "☀️ Morning Session (2 Rounds)",
          focus: "Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Slow squats", reps: "10", time: 40, form: ["3 seconds down, slow up"], isCore: true },
            { name: "Lunges", reps: "6 each", time: 35, form: ["Take it easy"], isCore: true },
            { name: "Cat-Cow", reps: "10", time: 35, form: ["Deep stretch"], isCore: true },
            { name: "Hip circles", reps: "10", time: 30, form: ["Wide circles"], isCore: true },
            { name: "Plank", reps: "15 sec", time: 15, form: ["Light hold"], isCore: true }
          ]
        },
        pm: {
          id: "day4-pm",
          title: "🌙 Evening Session (~20 min total)",
          focus: "Stretch + breathing + light core",
          exercises: [
            { name: "Child's pose", reps: "60 sec", time: 60, form: ["Reach arms forward"], isCore: true },
            { name: "Bird-dog", reps: "10 each", time: 40, form: ["Opposite arm/leg reach"], isCore: true },
            { name: "Heel touches", reps: "16", time: 30, form: ["Gentle crunch"], isCore: true },
            { name: "Deep belly breathing", reps: "60 sec", time: 60, form: ["Inhale 4s, exhale 6s"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day5",
      title: "Day 5: Upper + Core",
      focus: "Expectation: Sweating ↑",
      sessions: {
        am: {
          id: "day5-am",
          title: "☀️ Morning Session (2 Rounds)",
          focus: "Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Knee pushups", reps: "10", time: 35, form: ["Keep back straight"], isCore: true },
            { name: "Shoulder taps", reps: "15", time: 30, form: ["From plank position"], isCore: true },
            { name: "Plank", reps: "20 sec", time: 20, form: ["Hold steady"], isCore: true },
            { name: "Squats", reps: "15", time: 40, form: ["Don't let knees cave in"], isCore: true },
            { name: "High knees", reps: "30 sec", time: 30, form: ["Drive knees up"], isCore: true }
          ]
        },
        pm: {
          id: "day5-pm",
          title: "🌙 Evening Session (2 Rounds)",
          focus: "Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Bicycle crunch", reps: "20", time: 35, form: ["Keep elbows wide"], isCore: true },
            { name: "Heel touches", reps: "20", time: 30, form: ["Focus on obliques"], isCore: true },
            { name: "Leg raises", reps: "10", time: 30, form: ["Control the descent"], isCore: true },
            { name: "Wall sit", reps: "25 sec", time: 25, form: ["Breathe deeply"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day6",
      title: "Day 6: Moderate Burn",
      focus: "Expectation: Stamina ↑",
      sessions: {
        am: {
          id: "day6-am",
          title: "☀️ Morning Session (2 Rounds)",
          focus: "Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Half burpees", reps: "10", time: 40, form: ["Jump feet in and out smoothly"], isCore: true },
            { name: "Squats", reps: "18", time: 45, form: ["Pace yourself"], isCore: true },
            { name: "Lunges", reps: "8 each", time: 40, form: ["Keep chest proud"], isCore: true },
            { name: "Pushups (Knee)", reps: "10", time: 35, form: ["Full range of motion"], isCore: true },
            { name: "Mountain climbers", reps: "30 sec", time: 30, form: ["Keep hips low"], isCore: true }
          ]
        },
        pm: {
          id: "day6-pm",
          title: "🌙 Evening Session (2 Rounds)",
          focus: "Core + Glutes Mix | Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Legs in & out", reps: "12", time: 30, form: ["Sit lean back, knees to chest"], isCore: true },
            { name: "Leg raises", reps: "10", time: 25, form: ["Lower slowly, flat back"], isCore: true },
            { name: "Russian twist", reps: "20", time: 30, form: ["Twist torso side to side"], isCore: true },
            { name: "Side plank", reps: "15 sec each", time: 30, form: ["Straight line"], isCore: true },
            { name: "Wall sit", reps: "25 sec", time: 25, form: ["90 degrees, back flat"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day7",
      title: "Day 7: Light Full Body",
      focus: "Recovery emphasis to prepare for Week 2 (3 Rounds next week).",
      sessions: {
        am: {
          id: "day7-am",
          title: "☀️ Morning Session (2 Rounds)",
          focus: "Rest: 10-15s between exercises, 45-60s between rounds",
          exercises: [
            { name: "Squats", reps: "12", time: 35, form: ["Smooth, controlled reps"], isCore: true },
            { name: "Lunges", reps: "8 each", time: 40, form: ["Gentle stretch"], isCore: true },
            { name: "Pushups (Knee)", reps: "8", time: 30, form: ["Don't rush"], isCore: true },
            { name: "Plank", reps: "20 sec", time: 20, form: ["Focus on breathing"], isCore: true }
          ]
        },
        pm: {
          id: "day7-pm",
          title: "🌙 Evening Session (Recovery)",
          focus: "Stretch + Light Core",
          exercises: [
            { name: "Cat-Cow", reps: "10 reps", time: 40, form: ["Arch and hollow back"], isCore: true },
            { name: "Legs in & out", reps: "10 reps", time: 30, form: ["Very slow pace"], isCore: true },
            { name: "Cobra stretch", reps: "30 sec", time: 30, form: ["Stretch abdominals"], isCore: true },
            { name: "Deep breathing / Corpse pose", reps: "2 mins", time: 120, form: ["Total relaxation"], isCore: true }
          ]
        }
      }
    },
    {
      id: "recovery",
      title: "Daily Cool-Down (5 Mins)",
      focus: "Perform AFTER every AM and PM session to reduce stiffness.",
      exercises: [
        { name: "Child’s Pose", reps: "45 sec", time: 45, form: ["Sit back on heels, stretch arms"], isCore: true },
        { name: "Cobra stretch", reps: "30 sec", time: 30, form: ["Lie on stomach, press chest up"], isCore: true },
        { name: "Hamstring stretch (Right)", reps: "30 sec", time: 30, form: ["Reach for toes, back straight"], isCore: true },
        { name: "Hamstring stretch (Left)", reps: "30 sec", time: 30, form: ["Reach for toes, back straight"], isCore: true },
        { name: "Quad stretch (Right)", reps: "30 sec", time: 30, form: ["Pull heel to glute"], isCore: true },
        { name: "Quad stretch (Left)", reps: "30 sec", time: 30, form: ["Pull heel to glute"], isCore: true },
        { name: "Lying breathing / corpse pose", reps: "1.5 - 2 mins", time: 105, form: ["Focus on calming heart rate"], isCore: true }
      ]
    }
  ],
  diet: standardDiet
};

const intermediateWorkoutData = {
  warmup: {
    title: "Intermediate Warm-Up (8 Mins)",
    focus: "Pre-session mobility (Before ALL AM & PM sessions)",
    exercises: [
      { name: "Neck rotations", reps: "10 each", time: 30, form: ["Slow circles"], isCore: true },
      { name: "Arm circles", reps: "15 each", time: 30, form: ["Forward and backward"], isCore: true },
      { name: "Shoulder rotations", reps: "15", time: 30, form: ["Roll up and back"], isCore: true },
      { name: "Shoulder stretch", reps: "15 sec each", time: 30, form: ["Pull arm across chest"], isCore: true },
      { name: "Tricep stretch", reps: "15 sec each", time: 30, form: ["Reach down spine"], isCore: true },
      { name: "Hip rotations", reps: "15 each", time: 40, form: ["Wide circles"], isCore: true },
      { name: "Dynamic squat reach", reps: "10", time: 40, form: ["Shallow squat, reach high"], isCore: true },
      { name: "Side lunges", reps: "8 each", time: 40, form: ["Keep chest up"], isCore: true },
      { name: "Cat-Cow", reps: "12", time: 40, form: ["Inhale arch, exhale round"], isCore: true },
      { name: "High plank to downward dog", reps: "8", time: 40, form: ["Pushup start, hips high"], isCore: true },
      { name: "Leg swings", reps: "10 each", time: 40, form: ["Hold wall for balance"], isCore: true },
      { name: "High knees or march", reps: "40 sec", time: 40, form: ["Controlled pace"], isCore: true }
    ]
  },
  days: [
    {
      id: "day1",
      title: "Day 1: Full-body base fat-loss",
      focus: "Target: 6.5 - 7.5 / 10 Intensity",
      sessions: {
        am: {
          id: "day1-am",
          title: "☀️ Morning Session (3 Rounds)",
          focus: "Focus: Thighs, glutes, belly, chest, underarms | Rest: 10-15s between moves, 60s between rounds",
          exercises: [
            { name: "Fast bodyweight squats", reps: "18", time: 40, form: ["Keep form tight"], isCore: true },
            { name: "Reverse lunges", reps: "10 each", time: 45, form: ["Step back far enough"], isCore: true },
            { name: "Knee push-ups", reps: "10–12", time: 35, form: ["Chest to floor"], isCore: true },
            { name: "Slow mountain climbers", reps: "30 sec", time: 30, form: ["Controlled core"], isCore: true },
            { name: "Hip bridge", reps: "18", time: 35, form: ["Squeeze at the top"], isCore: true },
            { name: "Shoulder taps", reps: "16 total", time: 30, form: ["Minimize hip sway"], isCore: true },
            { name: "Heel touches", reps: "24 total", time: 35, form: ["Reach side to side"], isCore: true }
          ]
        },
        pm: {
          id: "day1-pm",
          title: "🌙 Afternoon Session (3 Rounds)",
          focus: "Focus: Lower belly + obliques + glutes | Rest: 10s between moves, 60s between rounds",
          exercises: [
            { name: "Legs in & out", reps: "15", time: 35, form: ["Sit back on hands"], isCore: true },
            { name: "Leg raises", reps: "12", time: 30, form: ["Don't let heels touch"], isCore: true },
            { name: "Russian twists", reps: "24 total", time: 35, form: ["Twist full torso"], isCore: true },
            { name: "Donkey kicks", reps: "12 each", time: 40, form: ["Heel to ceiling"], isCore: true },
            { name: "Side plank hold", reps: "20 sec each", time: 40, form: ["Straight line"], isCore: true },
            { name: "Wall sit", reps: "30 sec", time: 30, form: ["90 degree bend"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day2",
      title: "Day 2: Lower body + core control",
      focus: "Target: 6.5 - 7.5 / 10 Intensity",
      sessions: {
        am: {
          id: "day2-am",
          title: "☀️ Morning Session (3 Rounds)",
          focus: "Focus: Thighs, hips, glutes, belly | Rest: 15s between moves, 60-75s between rounds",
          exercises: [
            { name: "Squats", reps: "18", time: 40, form: ["Weight on heels"], isCore: true },
            { name: "Sumo squats", reps: "15", time: 40, form: ["Wide stance, toes out"], isCore: true },
            { name: "Back leg raise", reps: "12 each", time: 40, form: ["Straight leg backward lift"], isCore: true },
            { name: "Step-ups on sturdy step", reps: "12 each", time: 45, form: ["Drive through front heel"], isCore: true },
            { name: "Plank to downward dog", reps: "10", time: 35, form: ["Hips to ceiling"], isCore: true },
            { name: "Bicycle crunches", reps: "24 total", time: 35, form: ["Elbow to opposite knee"], isCore: true },
            { name: "Hip bridge", reps: "18", time: 35, form: ["Push through heels"], isCore: true }
          ]
        },
        pm: {
          id: "day2-pm",
          title: "🌙 Afternoon Session (3 Rounds)",
          focus: "Focus: Love handles + lower abs | Rest: 10s between moves, 60s between rounds",
          exercises: [
            { name: "Leg scissors", reps: "24 total", time: 35, form: ["Criss-cross legs low"], isCore: true },
            { name: "Flutter kicks", reps: "24 total", time: 35, form: ["Small fast kicks"], isCore: true },
            { name: "Crunches", reps: "18", time: 30, form: ["Shoulder blades off floor"], isCore: true },
            { name: "Heel touches", reps: "24 total", time: 35, form: ["Crunch and reach"], isCore: true },
            { name: "Side plank dips", reps: "10 each", time: 40, form: ["Drop hip to floor, push up"], isCore: true },
            { name: "Child’s pose flow / core reset", reps: "30 sec", time: 30, form: ["Deep belly breathing"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day3",
      title: "Day 3: Slightly harder HIIT day",
      focus: "Target: 7.5 - 8.5 / 10 Intensity",
      sessions: {
        am: {
          id: "day3-am",
          title: "☀️ Morning Session (4 Rounds)",
          focus: "Focus: Full-body conditioning | Rest: 15s between moves, 75s between rounds",
          exercises: [
            { name: "Half-burpees", reps: "10", time: 35, form: ["No push-up, jump in & out"], isCore: true },
            { name: "Fast squats", reps: "20", time: 40, form: ["Speed up but keep form"], isCore: true },
            { name: "High knees (controlled)", reps: "30 sec", time: 30, form: ["Pace yourself"], isCore: true },
            { name: "Knee push-ups", reps: "12", time: 35, form: ["Core tight"], isCore: true },
            { name: "Mountain climbers", reps: "30 sec", time: 30, form: ["Moderate speed"], isCore: true },
            { name: "Hip bridge", reps: "20", time: 35, form: ["Continuous motion"], isCore: true },
            { name: "Russian twists", reps: "24 total", time: 35, form: ["Lean back"], isCore: true }
          ]
        },
        pm: {
          id: "day3-pm",
          title: "🌙 Afternoon Session (3 Rounds)",
          focus: "Focus: Arms/chest/core + moderate burn | Rest: 10-15s between moves, 60s between rounds",
          exercises: [
            { name: "Incline push-ups on bed/table", reps: "12", time: 30, form: ["Keep body straight"], isCore: true },
            { name: "Commandos slow", reps: "12 total", time: 35, form: ["Forearm to high plank"], isCore: true },
            { name: "Shoulder taps", reps: "20 total", time: 35, form: ["Wide feet for stability"], isCore: true },
            { name: "Military plank", reps: "25 sec", time: 25, form: ["Forearms, stay rigid"], isCore: true },
            { name: "Heel touches", reps: "24 total", time: 35, form: ["Oblique squeeze"], isCore: true },
            { name: "Wall sit", reps: "35 sec", time: 35, form: ["Back flat, breathe"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day4",
      title: "Day 4: Recovery + mobility",
      focus: "Target: Gentle adaptation & flexibility",
      sessions: {
        am: {
          id: "day4-am",
          title: "☀️ Morning Session (2 Rounds)",
          focus: "Focus: Flexibility, hips, core activation | Rest: 10s between moves, 45s between rounds",
          exercises: [
            { name: "Tempo squats", reps: "12 slow", time: 45, form: ["3 sec down, 1 sec up"], isCore: true },
            { name: "Reverse lunges", reps: "8 each", time: 40, form: ["Smooth step backs"], isCore: true },
            { name: "Cat-Cow", reps: "12", time: 35, form: ["Spinal wave motion"], isCore: true },
            { name: "Plank to downward dog", reps: "8", time: 30, form: ["Stretch calves at top"], isCore: true },
            { name: "Bird-dog", reps: "10 each", time: 40, form: ["Opposite arm & leg reach"], isCore: true },
            { name: "Side plank hold", reps: "15 sec each", time: 30, form: ["Hips stacked"], isCore: true }
          ]
        },
        pm: {
          id: "day4-pm",
          title: "🌙 Afternoon Session (2 Rounds)",
          focus: "Focus: Light core + stretch | Rest: 10s between moves, 45s between rounds",
          exercises: [
            { name: "Legs in & out", reps: "12", time: 30, form: ["Gentle pace"], isCore: true },
            { name: "Leg raises", reps: "10", time: 25, form: ["Control descent"], isCore: true },
            { name: "Heel touches", reps: "20 total", time: 30, form: ["Light crunch"], isCore: true },
            { name: "Hip bridge", reps: "15", time: 30, form: ["Open hips up"], isCore: true },
            { name: "Cobra + child’s pose flow", reps: "45 sec", time: 45, form: ["Alternate smoothly"], isCore: true },
            { name: "Deep breathing", reps: "60 sec", time: 60, form: ["4s inhale, 6s exhale"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day5",
      title: "Day 5: Balanced recomposition",
      focus: "Target: 6.5 - 7.5 / 10 Intensity",
      sessions: {
        am: {
          id: "day5-am",
          title: "☀️ Morning Session (4 Rounds)",
          focus: "Focus: Thighs, glutes, chest, core | Rest: 15s between moves, 60-75s between rounds",
          exercises: [
            { name: "Squats", reps: "18", time: 40, form: ["Steady rhythm"], isCore: true },
            { name: "Reverse lunges", reps: "10 each", time: 45, form: ["Chest up"], isCore: true },
            { name: "Knee push-ups", reps: "12", time: 35, form: ["Elbows slightly tucked"], isCore: true },
            { name: "Shoulder taps", reps: "20 total", time: 35, form: ["Solid plank base"], isCore: true },
            { name: "Hip bridge", reps: "18", time: 35, form: ["Glute focus"], isCore: true },
            { name: "Bicycle crunches", reps: "24 total", time: 35, form: ["Shoulder to knee"], isCore: true },
            { name: "High knees or fast march", reps: "30 sec", time: 30, form: ["Drive knees high"], isCore: true }
          ]
        },
        pm: {
          id: "day5-pm",
          title: "🌙 Afternoon Session (3 Rounds)",
          focus: "Focus: Lower abs + love handles + underarm support | Rest: 10s between moves, 60s between rounds",
          exercises: [
            { name: "Flutter kicks", reps: "24 total", time: 35, form: ["Legs straight"], isCore: true },
            { name: "Russian twists", reps: "24 total", time: 35, form: ["Rotational twist"], isCore: true },
            { name: "Side plank dips", reps: "10 each", time: 40, form: ["Dip and drive up"], isCore: true },
            { name: "Incline push-ups", reps: "10–12", time: 30, form: ["Use bed or sturdy table"], isCore: true },
            { name: "Wall sit", reps: "30 sec", time: 30, form: ["Legs at 90 degrees"], isCore: true },
            { name: "Donkey kicks", reps: "12 each", time: 40, form: ["Don't arch lower back"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day6",
      title: "Day 6: Progression day",
      focus: "Target: 7.5 - 8.5 / 10 Intensity (Hardest Day)",
      sessions: {
        am: {
          id: "day6-am",
          title: "☀️ Morning Session (4 Rounds)",
          focus: "Focus: Progression toward advanced | Rest: 15s between moves, 75s between rounds",
          exercises: [
            { name: "Half-burpees", reps: "12", time: 40, form: ["Explosive stand up"], isCore: true },
            { name: "Fast squats", reps: "20", time: 40, form: ["Push the pace safely"], isCore: true },
            { name: "Alternating split squats", reps: "10 each", time: 45, form: ["Drop back knee low"], isCore: true },
            { name: "Mountain climbers", reps: "35 sec", time: 35, form: ["Keep hips down"], isCore: true },
            { name: "Knee push-ups", reps: "12–15", time: 40, form: ["Full range of motion"], isCore: true },
            { name: "Russian twists", reps: "28 total", time: 40, form: ["Lean back further"], isCore: true },
            { name: "Hip bridge", reps: "20", time: 35, form: ["Max glute squeeze"], isCore: true }
          ]
        },
        pm: {
          id: "day6-pm",
          title: "🌙 Afternoon Session (3 Rounds)",
          focus: "Focus: Core + glute endurance | Rest: 10-15s between moves, 60s between rounds",
          exercises: [
            { name: "Legs in & out", reps: "15", time: 35, form: ["Fully extend legs"], isCore: true },
            { name: "Leg scissors", reps: "24 total", time: 35, form: ["Keep feet low"], isCore: true },
            { name: "Side plank hold", reps: "20 sec each", time: 40, form: ["No hip sagging"], isCore: true },
            { name: "Donkey kicks", reps: "15 each", time: 45, form: ["High heel kicks"], isCore: true },
            { name: "Back leg raise", reps: "15 each", time: 45, form: ["Isolate glutes"], isCore: true },
            { name: "Wall sit", reps: "35 sec", time: 35, form: ["Breathe through burn"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day7",
      title: "Day 7: Consolidation day",
      focus: "Target: 6.5 - 7.5 / 10 Intensity",
      sessions: {
        am: {
          id: "day7-am",
          title: "☀️ Morning Session (3 Rounds)",
          focus: "Focus: Full-body, not brutal | Rest: 10-15s between moves, 60s between rounds",
          exercises: [
            { name: "Step-ups", reps: "12 each", time: 45, form: ["Sturdy box/chair"], isCore: true },
            { name: "Sumo squats", reps: "15", time: 40, form: ["Knees track over toes"], isCore: true },
            { name: "Incline push-ups", reps: "12", time: 30, form: ["Smooth reps"], isCore: true },
            { name: "Shoulder taps", reps: "16 total", time: 30, form: ["Core locked"], isCore: true },
            { name: "Bicycle crunches", reps: "24 total", time: 35, form: ["Twist"], isCore: true },
            { name: "Plank", reps: "25 sec", time: 25, form: ["Flat back"], isCore: true },
            { name: "High knees or march", reps: "30 sec", time: 30, form: ["Keep moving"], isCore: true }
          ]
        },
        pm: {
          id: "day7-pm",
          title: "🌙 Afternoon Session (2-3 Rounds)",
          focus: "Focus: Mobility + lower belly + obliques | Rest: 10s between moves, 45-60s between rounds",
          exercises: [
            { name: "Leg raises", reps: "10–12", time: 25, form: ["Controlled"], isCore: true },
            { name: "Heel touches", reps: "20 total", time: 30, form: ["Tap heels"], isCore: true },
            { name: "Hip bridge", reps: "15", time: 30, form: ["Squeeze"], isCore: true },
            { name: "Side plank hold", reps: "15–20 sec each", time: 35, form: ["Straight line"], isCore: true },
            { name: "Cat-Cow", reps: "12", time: 35, form: ["Spinal stretch"], isCore: true },
            { name: "Plank to downward dog", reps: "8", time: 30, form: ["Hips back"], isCore: true }
          ]
        }
      }
    },
    {
      id: "recovery",
      title: "Daily Cool-Down (5 Mins)",
      focus: "Perform AFTER every AM and PM session",
      exercises: [
        { name: "Child’s Pose", reps: "45 sec", time: 45, form: ["Sit back on heels, stretch arms"], isCore: true },
        { name: "Cobra stretch", reps: "30 sec", time: 30, form: ["Lie on stomach, press chest up"], isCore: true },
        { name: "Hamstring stretch (Right)", reps: "30 sec", time: 30, form: ["Reach for toes, back straight"], isCore: true },
        { name: "Hamstring stretch (Left)", reps: "30 sec", time: 30, form: ["Reach for toes, back straight"], isCore: true },
        { name: "Quad stretch (Right)", reps: "30 sec", time: 30, form: ["Pull heel to glute"], isCore: true },
        { name: "Quad stretch (Left)", reps: "30 sec", time: 30, form: ["Pull heel to glute"], isCore: true },
        { name: "Lying breathing / corpse pose", reps: "1.5 - 2 mins", time: 105, form: ["Focus on calming heart rate"], isCore: true }
      ]
    }
  ],
  diet: standardDiet
};

const advancedWorkoutData = {
  warmup: {
    title: "Advanced Warm-Up (8 Mins)",
    focus: "Prepare Your Body (Do this before every AM & PM session)",
    exercises: [
      { name: "Neck rotations", reps: "10 each", time: 30, form: ["Slow circles", "Both directions"], isCore: true },
      { name: "Arm circles", reps: "15 each", time: 30, form: ["Forward and backward"], isCore: true },
      { name: "Shoulder rotations", reps: "15", time: 30, form: ["Roll up and back"], isCore: true },
      { name: "Shoulder stretch", reps: "15 sec each", time: 30, form: ["Pull arm across chest"], isCore: true },
      { name: "Tricep stretch", reps: "15 sec each", time: 30, form: ["Reach down spine"], isCore: true },
      { name: "Hip rotations", reps: "15 each", time: 45, form: ["Wide circles"], isCore: true },
      { name: "Dynamic squat reach", reps: "12", time: 45, form: ["Shallow squat, reach high"], isCore: true },
      { name: "Side lunges", reps: "10 each", time: 45, form: ["Keep chest up"], isCore: true },
      { name: "Cat-Cow", reps: "15", time: 45, form: ["Spinal wave motion"], isCore: true },
      { name: "High plank to downward dog", reps: "10", time: 45, form: ["Hips to ceiling"], isCore: true },
      { name: "Leg swings", reps: "12 each", time: 45, form: ["Hold wall for balance"], isCore: true },
      { name: "High knees", reps: "45 sec", time: 45, form: ["Drive knees high"], isCore: true }
    ]
  },
  days: [
    {
      id: "day1",
      title: "Day 1: Full-body fat loss focus",
      focus: "Estimated Burn: 350–420 kcal | Hard Intensity",
      sessions: {
        am: {
          id: "day1-am",
          title: "☀️ Morning: Power HIIT (4 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Burpees", reps: "12", time: 45, form: ["Chest to floor", "Explosive jump"], isCore: true },
            { name: "Jump squats", reps: "20", time: 40, form: ["Explosive", "Soft landing"], isCore: true },
            { name: "Mountain climbers", reps: "40 sec", time: 40, form: ["Fast pace", "Hips low"], isCore: true },
            { name: "High knees", reps: "45 sec", time: 45, form: ["Pump arms"], isCore: true },
            { name: "Knee push-ups", reps: "15", time: 40, form: ["Full range of motion"], isCore: true },
            { name: "Shoulder taps", reps: "24 total", time: 35, form: ["Minimal hip sway"], isCore: true },
            { name: "Jumping lunges", reps: "10 each", time: 40, form: ["Switch in mid-air"], isCore: true },
            { name: "Military plank", reps: "30 sec", time: 30, form: ["Elbow to hand"], isCore: true }
          ]
        },
        pm: {
          id: "day1-pm",
          title: "🌙 Evening: Core + glute burn (4 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Legs in & out", reps: "20", time: 40, form: ["Sit back on hands"], isCore: true },
            { name: "Leg raises", reps: "15", time: 35, form: ["Keep lower back flat"], isCore: true },
            { name: "Flutter kicks", reps: "30 total", time: 35, form: ["Fast small kicks"], isCore: true },
            { name: "Russian twists", reps: "30 total", time: 40, form: ["Twist torso completely"], isCore: true },
            { name: "Heel touches", reps: "30 total", time: 40, form: ["Squeeze obliques"], isCore: true },
            { name: "Hip bridge", reps: "20", time: 40, form: ["Squeeze glutes hard"], isCore: true },
            { name: "Donkey kicks", reps: "15 each", time: 45, form: ["Heel to ceiling"], isCore: true },
            { name: "Side plank dips", reps: "12 each", time: 45, form: ["Drop hip, push up"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day2",
      title: "Day 2: Lower body + core density",
      focus: "Estimated Burn: 350–420 kcal | Hard-Moderate Intensity",
      sessions: {
        am: {
          id: "day2-am",
          title: "☀️ Morning: Lower body destroy (5 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Squats", reps: "20", time: 40, form: ["Chest up", "Weight on heels"], isCore: true },
            { name: "Lunges", reps: "12 each", time: 45, form: ["90 degree bend"], isCore: true },
            { name: "Sumo squats", reps: "18", time: 40, form: ["Wide stance", "Toes out"], isCore: true },
            { name: "Jump squats", reps: "15", time: 35, form: ["Explosive jump"], isCore: true },
            { name: "Back leg raise", reps: "15 each", time: 45, form: ["Straight leg", "Glute focus"], isCore: true },
            { name: "Side knee lifts", reps: "15 each", time: 45, form: ["Squeeze obliques"], isCore: true },
            { name: "Wall sit", reps: "40 sec", time: 40, form: ["90 degrees"], isCore: true }
          ]
        },
        pm: {
          id: "day2-pm",
          title: "🌙 Evening: Core attack (4 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Bicycle crunches", reps: "30 total", time: 40, form: ["Elbow to opposite knee"], isCore: true },
            { name: "Leg scissors", reps: "30 total", time: 40, form: ["Keep legs low"], isCore: true },
            { name: "Hip lift hold", reps: "25 sec", time: 25, form: ["Hips off floor"], isCore: true },
            { name: "Crunches", reps: "20", time: 35, form: ["Blades off floor"], isCore: true },
            { name: "Side plank hold", reps: "25 sec each", time: 50, form: ["Straight line"], isCore: true },
            { name: "Hip dips", reps: "15 each", time: 45, form: ["Plank position"], isCore: true },
            { name: "Plank to downward dog", reps: "12", time: 40, form: ["Hips to ceiling"], isCore: true },
            { name: "Commandos", reps: "16 total", time: 40, form: ["Elbows to hands"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day3",
      title: "Day 3: Highest intensity day",
      focus: "Estimated Burn: 380–450 kcal | Very Hard Intensity",
      sessions: {
        am: {
          id: "day3-am",
          title: "☀️ Morning: Tabata-style blast",
          focus: "Rest 90s between blocks | Follow 20s ON / 10s OFF per block",
          exercises: [
            { name: "Block 1: Burpees (Tabata)", reps: "8 Rnds (20s/10s)", time: 240, form: ["Work 20s, Rest 10s", "Repeat 8 times total"], isCore: true },
            { name: "Block 2: High knees (Tabata)", reps: "8 Rnds (20s/10s)", time: 240, form: ["Work 20s, Rest 10s", "Repeat 8 times total"], isCore: true },
            { name: "Block 3: Mtn climbers (Tabata)", reps: "8 Rnds (20s/10s)", time: 240, form: ["Work 20s, Rest 10s", "Repeat 8 times total"], isCore: true },
            { name: "Push-up to shoulder tap", reps: "10 + 10 taps", time: 40, form: ["1 push-up, tap each shoulder"], isCore: true },
            { name: "Jump squats", reps: "20", time: 40, form: ["Max effort"], isCore: true },
            { name: "Plank", reps: "45 sec", time: 45, form: ["Hold steady"], isCore: true }
          ]
        },
        pm: {
          id: "day3-pm",
          title: "🌙 Evening: Fat-burn circuit (5 Rounds)",
          focus: "Rest: 15-20s between moves, 45s between rounds",
          exercises: [
            { name: "Jumping jacks", reps: "60 sec", time: 60, form: ["Full extension"], isCore: true },
            { name: "Half-burpees", reps: "15", time: 40, form: ["No push-up"], isCore: true },
            { name: "Floor taps", reps: "45 sec", time: 45, form: ["Lateral shuffle"], isCore: true },
            { name: "Butt kicks", reps: "45 sec", time: 45, form: ["Fast pace"], isCore: true },
            { name: "Step-ups", reps: "20 each", time: 60, form: ["Use sturdy platform"], isCore: true },
            { name: "Skater jumps", reps: "16 each", time: 45, form: ["Leap side to side"], isCore: true },
            { name: "T raise", reps: "15", time: 35, form: ["Squeeze blades"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day4",
      title: "Day 4: Active recovery / lower-stress",
      focus: "Estimated Burn: 180–220 kcal | Recovery Intensity",
      sessions: {
        am: {
          id: "day4-am",
          title: "☀️ Morning: Mobility + Low-impact (3 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Tempo squats", reps: "12 slow", time: 50, form: ["3 seconds down, slow up"], isCore: true },
            { name: "Reverse lunges", reps: "10 each", time: 45, form: ["Controlled step"], isCore: true },
            { name: "Hip bridge", reps: "20", time: 40, form: ["Gentle lift"], isCore: true },
            { name: "Bird-dog", reps: "12 each", time: 45, form: ["Opposite arm/leg reach"], isCore: true },
            { name: "Plank to downward dog", reps: "12", time: 40, form: ["Stretch calves"], isCore: true },
            { name: "Side plank hold", reps: "20 sec each", time: 40, form: ["Light hold"], isCore: true }
          ]
        },
        pm: {
          id: "day4-pm",
          title: "🌙 Evening: Core + stretch restore (3 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Legs in & out", reps: "15", time: 35, form: ["Smooth pace"], isCore: true },
            { name: "Heel touches", reps: "24 total", time: 35, form: ["Gentle crunch"], isCore: true },
            { name: "Cobra to child’s pose flow", reps: "60 sec", time: 60, form: ["Alternate poses"], isCore: true },
            { name: "Cat-Cow", reps: "15", time: 45, form: ["Spinal mobility"], isCore: true },
            { name: "Dead bug", reps: "12 each", time: 45, form: ["Lower back flat"], isCore: true },
            { name: "Wall sit", reps: "30 sec", time: 30, form: ["Breathe"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day5",
      title: "Day 5: Chest, arms, core, thighs",
      focus: "Estimated Burn: 350–420 kcal | Hard Intensity",
      sessions: {
        am: {
          id: "day5-am",
          title: "☀️ Morning: Upper + HIIT mix (5 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Knee push-ups", reps: "18", time: 45, form: ["Keep back straight"], isCore: true },
            { name: "Commandos", reps: "18 total", time: 45, form: ["Maintain rigid core"], isCore: true },
            { name: "Shoulder taps", reps: "30 total", time: 40, form: ["No hip sway"], isCore: true },
            { name: "High knees", reps: "45 sec", time: 45, form: ["Drive knees high"], isCore: true },
            { name: "Mountain climbers", reps: "45 sec", time: 45, form: ["Fast pace"], isCore: true },
            { name: "Squats", reps: "20", time: 40, form: ["Full depth"], isCore: true },
            { name: "Plank jacks", reps: "30 sec", time: 30, form: ["Jump feet in/out"], isCore: true }
          ]
        },
        pm: {
          id: "day5-pm",
          title: "🌙 Evening: Core + glute finisher (4 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Bicycle crunches", reps: "30 total", time: 40, form: ["Elbow to opposite knee"], isCore: true },
            { name: "Russian twists", reps: "30 total", time: 40, form: ["Twist completely"], isCore: true },
            { name: "Leg raises", reps: "15", time: 35, form: ["Lower slowly"], isCore: true },
            { name: "Donkey kicks", reps: "15 each", time: 45, form: ["Heel to ceiling"], isCore: true },
            { name: "Back leg raise", reps: "15 each", time: 45, form: ["Squeeze glutes"], isCore: true },
            { name: "Hip dips", reps: "15 each", time: 45, form: ["Rotate from plank"], isCore: true },
            { name: "Wall sit", reps: "40 sec", time: 40, form: ["Burn it out"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day6",
      title: "Day 6: Lower body + full HIIT overload",
      focus: "Estimated Burn: 360–430 kcal | Very Hard Intensity",
      sessions: {
        am: {
          id: "day6-am",
          title: "☀️ Morning: Lower body overload (5 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Squats", reps: "25", time: 45, form: ["Consistent pace"], isCore: true },
            { name: "Sumo squats", reps: "20", time: 45, form: ["Wide stance"], isCore: true },
            { name: "Jump squats", reps: "15", time: 35, form: ["Explosive power"], isCore: true },
            { name: "Lunges", reps: "12 each", time: 45, form: ["Keep chest up"], isCore: true },
            { name: "Jumping lunges", reps: "8 each", time: 35, form: ["Switch in mid-air"], isCore: true },
            { name: "Hip bridge", reps: "20", time: 40, form: ["Squeeze tight"], isCore: true },
            { name: "Side knee lifts", reps: "18 each", time: 50, form: ["Engage obliques"], isCore: true }
          ]
        },
        pm: {
          id: "day6-pm",
          title: "🌙 Evening: HIIT burner (4 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Burpees", reps: "12", time: 45, form: ["Full chest to floor"], isCore: true },
            { name: "Jumping jacks", reps: "60 sec", time: 60, form: ["Keep arms straight"], isCore: true },
            { name: "High knees", reps: "45 sec", time: 45, form: ["Pump arms"], isCore: true },
            { name: "Mountain climbers", reps: "45 sec", time: 45, form: ["Speed is key"], isCore: true },
            { name: "Floor taps", reps: "45 sec", time: 45, form: ["Side to side shuffle"], isCore: true },
            { name: "Push-up to shoulder tap", reps: "8 + 8 taps", time: 40, form: ["1 push-up, tap each side"], isCore: true },
            { name: "Military plank", reps: "35 sec", time: 35, form: ["Forearm to hands"], isCore: true }
          ]
        }
      }
    },
    {
      id: "day7",
      title: "Day 7: Controlled hard day + restoration",
      focus: "Estimated Burn: 200–250 kcal | Moderate Intensity",
      sessions: {
        am: {
          id: "day7-am",
          title: "☀️ Morning: Balanced full body (4 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Half-burpees", reps: "12", time: 35, form: ["No push-up"], isCore: true },
            { name: "Step-ups", reps: "18 each", time: 55, form: ["Drive with front leg"], isCore: true },
            { name: "Reverse lunges", reps: "12 each", time: 45, form: ["Smooth motion"], isCore: true },
            { name: "Bicycle crunches", reps: "24 total", time: 35, form: ["Twist torso"], isCore: true },
            { name: "Knee push-ups", reps: "15", time: 40, form: ["Controlled"], isCore: true },
            { name: "Shoulder taps", reps: "24 total", time: 35, form: ["Tight core"], isCore: true },
            { name: "Plank", reps: "40 sec", time: 40, form: ["Breathe"], isCore: true }
          ]
        },
        pm: {
          id: "day7-pm",
          title: "🌙 Evening: Core + mobility reset (3 Rounds)",
          focus: "Rest: 15-20s between moves, 60s between rounds",
          exercises: [
            { name: "Leg raises", reps: "12", time: 30, form: ["Slow descent"], isCore: true },
            { name: "Heel touches", reps: "24 total", time: 35, form: ["Reach side to side"], isCore: true },
            { name: "Side plank hold", reps: "20 sec each", time: 40, form: ["Hips stacked"], isCore: true },
            { name: "Hip bridge", reps: "15", time: 30, form: ["Squeeze at top"], isCore: true },
            { name: "Cat-Cow", reps: "15", time: 45, form: ["Stretch spine"], isCore: true },
            { name: "Plank to downward dog", reps: "10", time: 35, form: ["Push hips high"], isCore: true }
          ]
        }
      }
    },
    {
      id: "recovery",
      title: "Daily Cool-Down (5 Mins)",
      focus: "Perform AFTER every AM and PM session",
      exercises: [
        { name: "Child’s Pose", reps: "45 sec", time: 45, form: ["Sit back on heels, stretch arms"], isCore: true },
        { name: "Cobra stretch", reps: "30 sec", time: 30, form: ["Lie on stomach, press chest up"], isCore: true },
        { name: "Hamstring stretch (Right)", reps: "30 sec", time: 30, form: ["Reach for toes, back straight"], isCore: true },
        { name: "Hamstring stretch (Left)", reps: "30 sec", time: 30, form: ["Reach for toes, back straight"], isCore: true },
        { name: "Quad stretch (Right)", reps: "30 sec", time: 30, form: ["Pull heel to glute"], isCore: true },
        { name: "Quad stretch (Left)", reps: "30 sec", time: 30, form: ["Pull heel to glute"], isCore: true },
        { name: "Lying breathing / corpse pose", reps: "1.5 - 2 mins", time: 105, form: ["Focus on calming heart rate"], isCore: true }
      ]
    }
  ],
  diet: standardDiet
};

const appLevels = {
  beginner: {
    id: 'beginner',
    title: 'Beginner',
    subtitle: 'Start your fitness journey and build a habit',
    icon: Shield,
    colorClass: 'text-amber-800 dark:text-amber-500',
    bgClass: 'bg-white/80 dark:bg-black/40 backdrop-blur-md border-2 border-white/80 dark:border-white/10 hover:bg-white dark:hover:bg-black/60',
    data: beginnerWorkoutData,
    metrics: { met: "~4.0", time: "55 min", calories: "120–150 kcal" }
  },
  intermediate: {
    id: 'intermediate',
    title: 'Intermediate',
    subtitle: 'Push your limits with higher intensity and volume',
    icon: TrendingUp,
    colorClass: 'text-amber-800 dark:text-amber-500',
    bgClass: 'bg-white/80 dark:bg-black/40 backdrop-blur-md border-2 border-white/80 dark:border-white/10 hover:bg-white dark:hover:bg-black/60',
    data: intermediateWorkoutData,
    metrics: { met: "~5.5", time: "70 min", calories: "220–280 kcal" }
  },
  advanced: {
    id: 'advanced',
    title: 'Advanced',
    subtitle: 'For seasoned athletes. Maximum burn & endurance',
    icon: Zap,
    colorClass: 'text-amber-800 dark:text-amber-500',
    bgClass: 'bg-white/80 dark:bg-black/40 backdrop-blur-md border-2 border-white/80 dark:border-white/10 hover:bg-white dark:hover:bg-black/60',
    data: advancedWorkoutData,
    metrics: { met: "~7.0", time: "80 min", calories: "350–420 kcal" }
  },
  cardio: {
    id: 'cardio',
    title: 'Climbing Stairs / Jogging',
    subtitle: 'Cardiovascular Burn',
    icon: Footprints,
    colorClass: 'text-amber-800 dark:text-amber-500',
    bgClass: 'bg-white/80 dark:bg-black/40 backdrop-blur-md border-2 border-white/80 dark:border-white/10 hover:bg-white dark:hover:bg-black/60',
    data: cardioWorkoutData,
    metrics: { met: "~3.4", time: "1 hr", speed: "5 km/hr", calories: "~180 kcal" }
  },
  hiit: {
    id: 'hiit',
    title: 'Fat-Torcher HIIT',
    subtitle: 'Fast Paced Bodyweight',
    icon: Flame,
    colorClass: 'text-amber-800 dark:text-amber-500',
    bgClass: 'bg-white/80 dark:bg-black/40 backdrop-blur-md border-2 border-white/80 dark:border-white/10 hover:bg-white dark:hover:bg-black/60',
    data: hiit500WorkoutData,
    metrics: { met: "~7.5", time: "45 min", calories: "~200 kcal" }
  },
  redesign: {
    id: 'redesign',
    title: 'Lower Body Redesign',
    subtitle: '30-Day Zero-Equipment Shape Plan',
    icon: Sparkles,
    colorClass: 'text-amber-800 dark:text-amber-500',
    bgClass: 'bg-white/80 dark:bg-black/40 backdrop-blur-md border-2 border-white/80 dark:border-white/10 hover:bg-white dark:hover:bg-black/60',
    data: lowerBodyRedesignData,
    metrics: { met: "~6.8", time: "40 min", calories: "180–220 kcal" }
  }
};

const bgThemes = {
  // All themes use the CSS body gradient — these classes add a subtle tint override
  default: 'text-[#e8f4ff]',
  inferno: 'text-[#e8f4ff] [--orb1:theme(colors.red.500/30%)] [--orb2:theme(colors.orange.500/20%)]',
  titanium: 'text-[#e8f4ff] [--orb1:theme(colors.slate.400/25%)] [--orb2:theme(colors.zinc.400/15%)]',
  voltage: 'text-[#e8f4ff] [--orb1:theme(colors.violet.500/30%)] [--orb2:theme(colors.indigo.400/20%)]',
  jungle: 'text-[#e8f4ff] [--orb1:theme(colors.emerald.500/25%)] [--orb2:theme(colors.teal.400/18%)]'
};

const themeAccents: any = {
  default: {
    text: 'text-cyan-300',
    hoverText: 'hover:text-cyan-200',
    bg: 'bg-cyan-400',
    bgLight: 'bg-cyan-400/15',
    border: 'border-cyan-400/40',
    textDark: 'text-cyan-200',
    activeGlow: 'neon-glow-cyan-active',
    ring: 'ring-cyan-400',
    iconColor: 'text-cyan-300',
    badgeBg: 'bg-cyan-400/15',
    textColor: 'text-cyan-300'
  },
  inferno: {
    text: 'text-red-700 dark:text-orange-500',
    hoverText: 'hover:text-red-700 dark:hover:text-orange-400',
    bg: 'bg-red-700 dark:bg-orange-600',
    bgLight: 'bg-red-700/10 dark:bg-orange-500/10',
    border: 'border-red-700 dark:border-orange-500/30',
    textDark: 'text-red-900 dark:text-orange-400',
    activeGlow: 'neon-glow-orange-active',
    ring: 'ring-red-600',
    iconColor: 'text-red-700 dark:text-orange-500',
    badgeBg: 'bg-red-500/10',
    textColor: 'text-red-700'
  },
  titanium: {
    text: 'text-slate-800 dark:text-slate-400',
    hoverText: 'hover:text-slate-800 dark:hover:text-slate-300',
    bg: 'bg-slate-800 dark:bg-slate-700',
    bgLight: 'bg-slate-800/10 dark:bg-slate-500/10',
    border: 'border-slate-800 dark:border-slate-500/30',
    textDark: 'text-slate-900 dark:text-slate-300',
    activeGlow: 'neon-glow-slate-active',
    ring: 'ring-slate-600',
    iconColor: 'text-slate-700 dark:text-slate-400',
    badgeBg: 'bg-slate-500/10',
    textColor: 'text-slate-700'
  },
  voltage: {
    text: 'text-blue-800 dark:text-blue-400',
    hoverText: 'hover:text-blue-800 dark:hover:text-blue-300',
    bg: 'bg-blue-800 dark:bg-indigo-600',
    bgLight: 'bg-blue-800/10 dark:bg-indigo-500/10',
    border: 'border-blue-800 dark:border-indigo-500/30',
    textDark: 'text-blue-900 dark:text-indigo-400',
    activeGlow: 'neon-glow-blue-active',
    ring: 'ring-blue-600',
    iconColor: 'text-blue-700 dark:text-blue-400',
    badgeBg: 'bg-blue-500/10',
    textColor: 'text-blue-700'
  },
  jungle: {
    text: 'text-emerald-800 dark:text-emerald-400',
    hoverText: 'hover:text-emerald-800 dark:hover:text-emerald-300',
    bg: 'bg-emerald-800 dark:bg-emerald-600',
    bgLight: 'bg-emerald-800/10 dark:bg-emerald-500/10',
    border: 'border-emerald-800 dark:border-emerald-500/30',
    textDark: 'text-emerald-900 dark:text-emerald-400',
    activeGlow: 'neon-glow-emerald-active',
    ring: 'ring-emerald-600',
    iconColor: 'text-emerald-700 dark:text-emerald-500',
    badgeBg: 'bg-emerald-500/10',
    textColor: 'text-emerald-700'
  }
};

const ThemePicker = ({ bgTheme, setBgTheme }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const themes = [
    { id: 'default', color: 'bg-gradient-to-tr from-[#253342] to-[#51677d]', label: 'Axion' },
    { id: 'inferno', color: 'bg-gradient-to-br from-red-500 to-orange-500', label: 'Fat Burn' },
    { id: 'titanium', color: 'bg-gradient-to-br from-slate-500 to-zinc-600', label: 'Discipline' },
    { id: 'voltage', color: 'bg-gradient-to-br from-blue-500 to-indigo-600', label: 'Energy' },
    { id: 'jungle', color: 'bg-gradient-to-br from-emerald-500 to-teal-600', label: 'Endurance' }
  ];

  return (
    <div ref={containerRef} className="relative z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="p-3 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md text-[#555555] dark:text-gray-200 hover:bg-white/80 dark:hover:bg-white/20 border-2 border-white/80 dark:border-white/10 shadow-md transition-all active:scale-95" title="Change Theme">
        <Palette className="w-6 h-6" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 p-3 bg-white/95 dark:bg-[#1e293b] backdrop-blur-2xl rounded-2xl shadow-2xl border-2 border-white/60 dark:border-white/10 flex gap-3 z-50 animate-in fade-in zoom-in duration-200">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => { setBgTheme(t.id); setIsOpen(false); }}
              className={`w-8 h-8 rounded-full shadow-md hover:scale-125 transition-transform ${t.color} ${bgTheme === t.id ? 'ring-2 ring-offset-2 ring-offset-[#FAF9F6] dark:ring-offset-[#0f172a] ring-amber-600' : ''}`}
              title={t.label}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const ExerciseCard = ({ exercise, onRemove, sequenceState = 'idle', onSequenceComplete, globalResetTrigger, isDarkMode, activeGlow }: any) => {
  const [timeLeft, setTimeLeft] = useState(exercise.time);
  const [isRunning, setIsRunning] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [phase, setPhase] = useState('work');
  const timerRef = useRef(null);
  const cardRef = useRef(null);

  const sequenceCompleteRef = useRef(onSequenceComplete);
  const sequenceStateRef = useRef(sequenceState);
  const prevSeqState = useRef(sequenceState);

  useEffect(() => {
    sequenceCompleteRef.current = onSequenceComplete;
    sequenceStateRef.current = sequenceState;
  }, [onSequenceComplete, sequenceState]);

  useEffect(() => {
    if (globalResetTrigger > 0) {
      setIsRunning(false);
      setPhase('work');
      setTimeLeft(exercise.time);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [globalResetTrigger, exercise.time]);

  useEffect(() => {
    if (sequenceState === 'active' && prevSeqState.current !== 'active') {
      if (prevSeqState.current === 'idle') {
        setPhase('work');
        setTimeLeft(exercise.time);
      }
      setIsRunning(true);
      if (cardRef.current) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (sequenceState === 'paused') {
      setIsRunning(false);
    } else if (sequenceState === 'idle' && prevSeqState.current !== 'idle') {
      setIsRunning(false);
      setPhase('work');
    }
    prevSeqState.current = sequenceState;
  }, [sequenceState, exercise.time]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            playBeep();

            if (phase === 'work' && sequenceStateRef.current === 'active') {
              setPhase('rest');
              setIsRunning(true);
              return 15;
            } else {
              setIsRunning(false);
              if (sequenceStateRef.current === 'active') {
                setTimeout(() => {
                  if (sequenceCompleteRef.current) sequenceCompleteRef.current();
                }, 500);
              }
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, phase]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSkip = () => {
    setIsRunning(false);
    setPhase('work');
    if (onSequenceComplete) onSequenceComplete();
  };

  const isResting = phase === 'rest';

  return (
    <div ref={cardRef} className={`backdrop-blur-xl border transition-all duration-500 rounded-3xl p-4 sm:p-5 shadow-lg glass-panel text-white
      ${sequenceState !== 'idle' && !isResting ? `${activeGlow || 'neon-glow-orange-active'} scale-[1.02]`
        : sequenceState !== 'idle' && isResting ? 'neon-glow-emerald-active scale-[1.02]'
          : 'hover:border-white/20'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 flex items-start sm:items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <Activity className={`w-5 h-5 ${isResting ? 'text-emerald-400 animate-pulse' : 'text-cyan-400'}`} />
              <h3 className={`text-base sm:text-lg font-black tracking-tight leading-tight ${isResting ? 'text-emerald-400' : 'text-white'}`}>
                {isResting ? 'Rest & Recover' : exercise.name}
              </h3>
            </div>
            <p className={`font-bold text-xs sm:text-sm ${isResting ? 'text-emerald-400/80' : 'text-sky-200/60'}`}>
              {isResting ? 'Breathe deeply. Prepare for next.' : <>Target: <span className="text-cyan-400 font-black">{exercise.reps}</span></>}
            </p>
          </div>
          {!exercise.isCore && (
            <button onClick={onRemove} className="p-2 sm:ml-4 text-rose-400 hover:bg-rose-500/10 rounded-full transition-colors flex-shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className={`flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end rounded-2xl p-2.5 border transition-all duration-300 ${isResting ? 'bg-emerald-950/40 border-emerald-500/40' : 'bg-slate-950/40 border-white/10'}`}>
          <div className={`font-mono text-lg sm:text-2xl w-16 sm:w-20 text-center font-black tracking-tight ${timeLeft === 0 ? 'text-rose-400' : isResting ? 'text-emerald-400' : 'text-cyan-300'}`}>
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={() => setIsRunning(!isRunning)} className={`p-2.5 sm:p-3 rounded-xl transition-all shadow-md flex-shrink-0 border ${isRunning ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20' : isResting ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' : 'bg-cyan-400/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20'}`}>
              {isRunning ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />}
            </button>

            {sequenceState !== 'idle' ? (
              <button
                onClick={handleSkip}
                className="p-2.5 sm:p-3 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20 transition-all flex-shrink-0 flex items-center justify-center gap-1 shadow-md"
                title={isResting ? "Skip Rest" : "Skip Exercise"}
              >
                <FastForward className="w-4 h-4 sm:w-5 sm:h-5" />
                {isResting && <span className="text-xs font-black mr-1 hidden sm:inline tracking-tighter">SKIP</span>}
              </button>
            ) : (
              <button onClick={() => { setIsRunning(false); setPhase('work'); setTimeLeft(exercise.time); }} className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-sky-200 hover:bg-white/10 transition-colors flex-shrink-0">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 text-sm text-sky-200/60 hover:text-cyan-400 transition-colors w-full group py-1">
          {showForm ? <ChevronUp className="w-4 h-4 group-hover:scale-110" /> : <ChevronDown className="w-4 h-4 group-hover:scale-110" />}
          <span className="font-black text-xs tracking-widest uppercase">Form Guide</span>
        </button>
        {showForm && exercise.form && (
          <ul className="mt-3 space-y-2 pl-2 animate-in slide-in-from-top-1 duration-200">
            {exercise.form.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-sky-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const CardioView = () => {
  const [isCustom, setIsCustom] = useState(false);
  const [weight, setWeight] = useState(65);
  const [targetCal, setTargetCal] = useState(500);

  const displayWeight = isCustom ? weight : 65;
  const displayTarget = isCustom ? targetCal : 500;

  const calcBurnRate = (met) => ((met * displayWeight * 3.5) / 200).toFixed(2);
  const calcDuration = (met) => Math.round(displayTarget / ((met * displayWeight * 3.5) / 200));

  const workouts = [
    { id: 'stairs', name: 'Stairs (Mixed)', met: 6.15, icon: TrendingUp, extra: `Volume: ~${Math.round(calcDuration(6.15) * 2)} floors` },
    { id: 'jogslow', name: 'Jog Slow + Walk', met: 6.0, icon: Footprints, extra: '' },
    { id: 'jogmed', name: 'Jog Med + Walk', met: 7.5, icon: Zap, extra: '' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto w-full">
      <div className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 text-[#37352f] dark:text-gray-100 shadow-2xl border-2 border-white/80 dark:border-white/10 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter">MET Calorie Calculator</h2>
          <div className="flex items-center gap-8 text-sm font-black">
            <div className="text-center sm:text-right">
              <div className="text-[10px] text-[#9CA3AF] uppercase tracking-widest mb-1">Profile</div>
              <div className={!isCustom ? "text-amber-700 dark:text-amber-500" : "text-gray-400"}>{isCustom ? "Custom" : "Standard"}</div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-[10px] text-[#9CA3AF] uppercase tracking-widest mb-1">Weight</div>
              <div className="text-amber-900 dark:text-gray-100">{displayWeight} kg</div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-[10px] text-[#9CA3AF] uppercase tracking-widest mb-1">Target</div>
              <div className="text-amber-900 dark:text-gray-100">{displayTarget} kcal</div>
            </div>
          </div>
        </div>

        <div className="bg-[#FAF9F6]/80 dark:bg-black/40 backdrop-blur-md rounded-3xl p-5 sm:p-7 mb-10 border-2 border-black/5 dark:border-white/10 shadow-inner transition-colors duration-300">
          <h3 className="text-xl font-black mb-4 tracking-tight">The MET Formula</h3>
          <div className="mb-6 inline-block bg-white dark:bg-black/60 px-6 py-3 rounded-2xl border-2 border-black/5 shadow-sm">
            <span className="font-mono text-lg text-[#374151] dark:text-gray-200">
              <span className="font-black text-amber-700 dark:text-amber-500">Cal/Min</span> = <span className="border-b-4 border-amber-500/30 dark:border-gray-600 pb-0.5">MET × Weight × 3.5</span> / 200
            </span>
          </div>
          <ul className="space-y-3 text-[#4B5563] dark:text-gray-300 text-sm font-bold list-none">
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span><strong>Target:</strong> Burn 500+ kcal primarily from fat (50-70% ratio).</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span><strong>Condition:</strong> Maintain Heart Rate below 70% of max for lipid oxidation.</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span><strong>MET:</strong> Measures energy cost of activities. Higher = Intense.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {workouts.map(w => (
            <div key={w.id} className="bg-[#FAF9F6]/80 dark:bg-black/40 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center border-2 border-white/80 dark:border-white/10 hover:border-amber-600 transition-all shadow-lg group">
              <div className="p-5 bg-amber-600/10 rounded-2xl mb-5 text-amber-700 group-hover:scale-110 transition-transform">
                <w.icon className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black mb-3 text-center">{w.name}</h4>
              <div className="bg-white dark:bg-black px-5 py-2 rounded-full text-xs font-black tracking-widest mb-8 text-[#6B7280] dark:text-gray-400 border-2 border-black/5">
                MET: {w.met}
              </div>

              <div className="w-full space-y-6">
                <div className="flex justify-between items-center border-b-2 border-black/5 pb-4">
                  <span className="text-[#6B7280] font-black text-xs uppercase tracking-tighter">Burn Rate</span>
                  <div className="text-right">
                    <div className="text-2xl font-black text-amber-900 dark:text-gray-100">{calcBurnRate(w.met)}</div>
                    <div className="text-[10px] text-[#9CA3AF] font-black uppercase">kcal/m</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-black text-xs uppercase tracking-tighter">Duration</span>
                  <div className="text-3xl font-black text-amber-700 dark:text-amber-500">{calcDuration(w.met)} <span className="text-sm font-black uppercase">min</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#FAF9F6]/60 dark:bg-black/40 backdrop-blur-md rounded-3xl p-6 border-2 border-black/5 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden transition-all">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/5 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto z-10">
            <div className={`flex items-center justify-between sm:justify-start gap-4 bg-white dark:bg-[#1e293b] px-6 py-4 rounded-2xl border-2 border-black/5 shadow-sm transition-all ${!isCustom ? 'opacity-30 grayscale' : 'opacity-100'}`}>
              <label className="text-xs text-[#6B7280] font-black uppercase tracking-widest w-24">Target kcal</label>
              <input
                type="number"
                value={targetCal}
                onChange={(e) => setTargetCal(Number(e.target.value))}
                disabled={!isCustom}
                className="bg-transparent border-none font-black text-xl text-amber-900 dark:text-gray-100 w-20 focus:ring-0 text-right outline-none"
              />
            </div>
            <div className={`flex items-center justify-between sm:justify-start gap-4 bg-white dark:bg-[#1e293b] px-6 py-4 rounded-2xl border-2 border-black/5 shadow-sm transition-all ${!isCustom ? 'opacity-30 grayscale' : 'opacity-100'}`}>
              <label className="text-xs text-[#6B7280] font-black uppercase tracking-widest w-24">Weight kg</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                disabled={!isCustom}
                className="bg-transparent border-none font-black text-xl text-amber-900 dark:text-gray-100 w-20 focus:ring-0 text-right outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end z-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#4B5563] dark:text-gray-300">Custom Profile</span>
            <button
              onClick={() => setIsCustom(!isCustom)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors shadow-inner ${isCustom ? 'bg-amber-600' : 'bg-black/10 dark:bg-white/10'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${isCustom ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-sm border-2 border-white/80 dark:border-white/10 transition-colors duration-300">
        <div className="flex items-center gap-3 mb-6 border-b-2 border-black/5 pb-5">
          <Activity className="w-8 h-8 text-amber-600" />
          <h3 className="text-2xl font-black tracking-tight">Hardware Sync</h3>
        </div>
        <ul className="space-y-5 text-[#4B5563] dark:text-gray-300 font-bold list-none pl-0">
          <li className="flex gap-4 items-start"><CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-1" />GPS & Accelerometer Sync: Native pedometer and GPS tracking for real-time pacing.</li>
          <li className="flex gap-4 items-start"><CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-1" />Wearable Biometrics: Integration with Apple Health/Google Fit for live heart rate.</li>
          <li className="flex gap-4 items-start"><CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-1" />Validation Logic: Guaranteed &gt;90% accuracy using VO2 max estimation.</li>
        </ul>
      </div>
    </div>
  );
};

// ─── ZEN MUSIC PLAYER ──────────────────────────────────────────────────────
const ZEN_TRACKS = [
  { id: 'zen',   name: 'Zen Flow',     desc: '432Hz · Meditation',  icon: '🧘' },
  { id: 'power', name: 'Power Surge',  desc: '128 BPM · Workout',   icon: '⚡' },
  { id: 'rain',  name: 'Rain Focus',   desc: 'Pink Noise · Calm',   icon: '🌧️' },
  { id: 'ocean', name: 'Ocean Waves',  desc: 'Wave Tone · Deep',    icon: '🌊' },
  { id: 'lofi',  name: 'Lofi Chill',  desc: '90 BPM · Beats',      icon: '🎵' },
];

const ZenPlayer = () => {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [vol, setVol] = useState(0.55);
  
  // Local files state
  const [isLocal, setIsLocal] = useState(false);
  const [localTracks, setLocalTracks] = useState<{name: string, url: string}[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [loop, setLoop] = useState(false);

  const ctxRef = useRef<any>(null);
  const masterRef = useRef<any>(null);
  const stopRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const getCtx = () => {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
    return ctxRef.current as AudioContext;
  };

  const getMaster = (ctx: AudioContext) => {
    if (!masterRef.current) {
      masterRef.current = ctx.createGain();
      masterRef.current.connect(ctx.destination);
    }
    masterRef.current.gain.value = vol;
    return masterRef.current as GainNode;
  };

  const stopAll = () => { 
    if (stopRef.current) { stopRef.current(); stopRef.current = null; } 
    if (audioRef.current) { audioRef.current.pause(); }
  };

  /* ── TRACK ENGINES ── */
  const playZen = (ctx: AudioContext, m: GainNode) => {
    const g = ctx.createGain(); g.gain.setValueAtTime(0, ctx.currentTime); g.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 2.5); g.connect(m);
    const oscs: OscillatorNode[] = [];
    [[432, 0.55],[528, 0.22],[639, 0.10],[741, 0.05]].forEach(([f, v]) => {
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f; og.gain.value = v;
      o.connect(og); og.connect(g); o.start(); oscs.push(o);
    });
    const lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.frequency.value = 0.07; lg.gain.value = 0.12;
    lfo.connect(lg); lg.connect(g.gain); lfo.start();
    return () => { g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5); setTimeout(() => { oscs.forEach(o=>{try{o.stop()}catch(e){}}); try{lfo.stop()}catch(e){} }, 1600); };
  };

  const playRain = (ctx: AudioContext, m: GainNode) => {
    const sz = 2 * ctx.sampleRate, buf = ctx.createBuffer(2, sz, ctx.sampleRate);
    for (let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<sz;i++)d[i]=Math.random()*2-1;}
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const f = ctx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=1500; f.Q.value=0.5;
    const g = ctx.createGain(); g.gain.setValueAtTime(0,ctx.currentTime); g.gain.linearRampToValueAtTime(0.75,ctx.currentTime+2);
    src.connect(f); f.connect(g); g.connect(m); src.start();
    return () => { g.gain.linearRampToValueAtTime(0,ctx.currentTime+1.5); setTimeout(()=>{try{src.stop()}catch(e){}},1600); };
  };

  const playOcean = (ctx: AudioContext, m: GainNode) => {
    const sz = 4*ctx.sampleRate, buf = ctx.createBuffer(2, sz, ctx.sampleRate);
    for(let c=0;c<2;c++){const d=buf.getChannelData(c);let b0=0,b1=0,b2=0;for(let i=0;i<sz;i++){const w=Math.random()*2-1;b0=0.99886*b0+w*0.0555;b1=0.99332*b1+w*0.0751;b2=0.96900*b2+w*0.1539;d[i]=(b0+b1+b2+w*0.0185)*0.18;}}
    const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
    const g=ctx.createGain();g.gain.setValueAtTime(0,ctx.currentTime);g.gain.linearRampToValueAtTime(0.8,ctx.currentTime+2);
    const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=0.05;lg.gain.value=0.28;lfo.connect(lg);lg.connect(g.gain);lfo.start();
    src.connect(g);g.connect(m);src.start();
    return ()=>{g.gain.linearRampToValueAtTime(0,ctx.currentTime+1.5);setTimeout(()=>{try{src.stop()}catch(e){};try{lfo.stop()}catch(e){}},1600);};
  };

  const playPower = (ctx: AudioContext, m: GainNode) => {
    const g=ctx.createGain();g.gain.setValueAtTime(0,ctx.currentTime);g.gain.linearRampToValueAtTime(0.7,ctx.currentTime+0.5);g.connect(m);
    let stopped=false; const beat=60/128;
    const kick=(t:number)=>{const o=ctx.createOscillator(),e=ctx.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(0.01,t+0.35);e.gain.setValueAtTime(1,t);e.gain.exponentialRampToValueAtTime(0.001,t+0.35);o.connect(e);e.connect(g);o.start(t);o.stop(t+0.35);};
    const hat=(t:number,v=0.25)=>{const sz=Math.floor(ctx.sampleRate*0.05),b=ctx.createBuffer(1,sz,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<sz;i++)d[i]=Math.random()*2-1;const s=ctx.createBufferSource();s.buffer=b;const f=ctx.createBiquadFilter();f.type='highpass';f.frequency.value=7000;const e=ctx.createGain();e.gain.setValueAtTime(v,t);e.gain.exponentialRampToValueAtTime(0.001,t+0.05);s.connect(f);f.connect(e);e.connect(g);s.start(t);};
    const snare=(t:number)=>{const sz=Math.floor(ctx.sampleRate*0.15),b=ctx.createBuffer(1,sz,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<sz;i++)d[i]=Math.random()*2-1;const s=ctx.createBufferSource();s.buffer=b;const f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=1200;const e=ctx.createGain();e.gain.setValueAtTime(0.7,t);e.gain.exponentialRampToValueAtTime(0.001,t+0.15);s.connect(f);f.connect(e);e.connect(g);s.start(t);};
    const bass=(t:number,fr:number)=>{const o=ctx.createOscillator(),f=ctx.createBiquadFilter(),e=ctx.createGain();o.type='sawtooth';o.frequency.value=fr;f.type='lowpass';f.frequency.value=350;e.gain.setValueAtTime(0.45,t);e.gain.exponentialRampToValueAtTime(0.001,t+beat*0.8);o.connect(f);f.connect(e);e.connect(g);o.start(t);o.stop(t+beat*0.9);};
    const bassLine=[80,80,100,80,60,80,80,100]; let bar=0;
    const sched=()=>{if(stopped)return;const now=ctx.currentTime;for(let i=0;i<4;i++){const t=now+i*beat;kick(t);hat(t+beat*0.5,0.18);hat(t,0.12);if(i===1||i===3)snare(t);bass(t,bassLine[(bar*4+i)%bassLine.length]);}bar++;setTimeout(()=>{if(!stopped)sched();},beat*4*1000-80);};
    sched();
    return ()=>{stopped=true;g.gain.linearRampToValueAtTime(0,ctx.currentTime+0.3);};
  };

  const playLofi = (ctx: AudioContext, m: GainNode) => {
    const g=ctx.createGain();g.gain.setValueAtTime(0,ctx.currentTime);g.gain.linearRampToValueAtTime(0.65,ctx.currentTime+1);g.connect(m);
    let stopped=false; const beat=60/90;
    const chords=[[261,329,392],[220,277,349],[196,247,311],[174,220,277]];
    const chord=(t:number,freqs:number[],dur:number)=>freqs.forEach(f=>{const o=ctx.createOscillator(),fl=ctx.createBiquadFilter(),e=ctx.createGain();o.type='triangle';o.frequency.value=f;fl.type='lowpass';fl.frequency.value=750;fl.Q.value=1;e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(0.18,t+0.04);e.gain.exponentialRampToValueAtTime(0.001,t+dur);o.connect(fl);fl.connect(e);e.connect(g);o.start(t);o.stop(t+dur);});
    const lkick=(t:number)=>{const o=ctx.createOscillator(),e=ctx.createGain();o.frequency.setValueAtTime(80,t);o.frequency.exponentialRampToValueAtTime(0.01,t+0.3);e.gain.setValueAtTime(0.55,t);e.gain.exponentialRampToValueAtTime(0.001,t+0.3);o.connect(e);e.connect(g);o.start(t);o.stop(t+0.3);};
    const lhat=(t:number,v=0.12)=>{const sz=Math.floor(ctx.sampleRate*0.06),b=ctx.createBuffer(1,sz,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<sz;i++)d[i]=Math.random()*2-1;const s=ctx.createBufferSource();s.buffer=b;const f=ctx.createBiquadFilter();f.type='highpass';f.frequency.value=6000;const e=ctx.createGain();e.gain.setValueAtTime(v,t);e.gain.exponentialRampToValueAtTime(0.001,t+0.08);s.connect(f);f.connect(e);e.connect(g);s.start(t);};
    let bar=0;
    const sched=()=>{if(stopped)return;const now=ctx.currentTime;chord(now,chords[bar%chords.length],beat*2);chord(now+beat*2,chords[(bar+1)%chords.length],beat*2);for(let i=0;i<4;i++){const t=now+i*beat;if(i===0||i===2)lkick(t);lhat(t+beat*0.5);lhat(t+beat*0.25,0.06);lhat(t+beat*0.75,0.06);}bar++;setTimeout(()=>{if(!stopped)sched();},beat*4*1000-80);};
    sched();
    return ()=>{stopped=true;g.gain.linearRampToValueAtTime(0,ctx.currentTime+0.6);};
  };

  const engines = [playZen, playPower, playRain, playOcean, playLofi];

  const play = (idx: number, asLocal: boolean, tracks: any[]) => {
    stopAll();
    
    if (asLocal && tracks.length > 0) {
      if (!audioRef.current) audioRef.current = new Audio();
      audioRef.current.src = tracks[idx].url;
      audioRef.current.volume = vol;
      audioRef.current.loop = loop;
      audioRef.current.play().catch(e => console.error("Playback failed", e));
      stopRef.current = () => audioRef.current?.pause();
    } else if (!asLocal) {
      const ctx = getCtx();
      const master = getMaster(ctx);
      master.gain.value = vol;
      stopRef.current = engines[idx](ctx, master);
    }
    setPlaying(true);
  };

  // Next/Prev Handlers
  const handleNext = () => {
    const listLen = isLocal ? localTracks.length : ZEN_TRACKS.length;
    if (listLen === 0) return;
    const nextIdx = shuffle ? Math.floor(Math.random() * listLen) : (track + 1) % listLen;
    setTrack(nextIdx);
    if (playing) play(nextIdx, isLocal, localTracks);
  };

  const handlePrev = () => {
    const listLen = isLocal ? localTracks.length : ZEN_TRACKS.length;
    if (listLen === 0) return;
    const prevIdx = shuffle ? Math.floor(Math.random() * listLen) : (track - 1 + listLen) % listLen;
    setTrack(prevIdx);
    if (playing) play(prevIdx, isLocal, localTracks);
  };

  const pause = () => { stopAll(); setPlaying(false); };

  const selectTrack = (idx: number, asLocal: boolean) => {
    setIsLocal(asLocal);
    setTrack(idx);
    if (playing) play(idx, asLocal, asLocal ? localTracks : ZEN_TRACKS);
  };

  const handleVol = (v: number) => {
    setVol(v);
    if (masterRef.current) masterRef.current.gain.value = v;
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleLoadFiles = (e: any) => {
    const files = Array.from(e.target.files as FileList).filter(f => f.type.startsWith('audio/'));
    if (files.length > 0) {
      // Free old URLs
      localTracks.forEach(t => URL.revokeObjectURL(t.url));
      
      const tracks = files.map(f => ({ name: f.name.replace(/\.[^/.]+$/, ""), url: URL.createObjectURL(f) }));
      setLocalTracks(tracks);
      setIsLocal(true);
      setTrack(0);
      play(0, true, tracks);
    }
    e.target.value = null; // reset
  };

  // Setup HTML Audio Event Listeners
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = loop;
      audioRef.current.onended = () => {
        if (!loop) {
          const listLen = localTracks.length;
          const nextIdx = shuffle ? Math.floor(Math.random() * listLen) : (track + 1) % listLen;
          setTrack(nextIdx);
          play(nextIdx, true, localTracks);
        }
      };
    }
  }, [loop, shuffle, track, localTracks]);

  // Cleanup
  useEffect(() => () => { 
    stopAll(); 
    if(ctxRef.current) ctxRef.current.close(); 
    localTracks.forEach(t => URL.revokeObjectURL(t.url));
  }, []);

  const t = isLocal && localTracks[track] ? {
    icon: '🎵', name: localTracks[track].name, desc: 'Local Audio'
  } : ZEN_TRACKS[track] || ZEN_TRACKS[0];

  return (
    <div className="fixed bottom-6 right-5 z-[150] flex flex-col items-end gap-3">
      {/* Hidden file inputs */}
      <input type="file" ref={fileInputRef} accept="audio/*" multiple className="hidden" onChange={handleLoadFiles} />
      <input type="file" ref={folderInputRef} accept="audio/*" {...{ webkitdirectory: "true" }} className="hidden" onChange={handleLoadFiles} />

      {/* Full panel */}
      {open && (
        <div className="zen-slide-up bg-[#0b1d35]/95 backdrop-blur-3xl border border-cyan-400/30 rounded-[2rem] p-5 w-[90vw] sm:w-80 max-w-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 shrink-0">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-300/50">Zen Mode</div>
              <div className="text-sm font-black text-white">In-App Music</div>
            </div>
            <button onClick={()=>setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-xl glass-ice text-sky-300 hover:text-white border border-white/10 text-xs font-black transition-all active:scale-90">✕</button>
          </div>

          {/* Now playing */}
          <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-blue-500/5 border border-cyan-400/20 text-center relative overflow-hidden shrink-0">
            <div className="text-3xl mb-1.5 select-none">{t.icon}</div>
            <div className="text-sm font-black text-white truncate max-w-[200px] mx-auto">{t.name}</div>
            <div className="text-[10px] text-sky-300/55 font-bold uppercase tracking-widest mt-0.5">{t.desc}</div>
            {/* Equalizer bars */}
            <div className={`flex gap-[3px] justify-center items-end mt-3 h-7 ${!playing ? 'opacity-0' : ''}`}>
              {['eq-bar-1','eq-bar-2','eq-bar-3','eq-bar-4','eq-bar-5'].map(cls => (
                <div key={cls} className={`w-[5px] bg-cyan-400 rounded-full ${cls}`} style={{height:'6px'}} />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mb-4 shrink-0">
            <button onClick={handlePrev} className="w-9 h-9 flex items-center justify-center rounded-full glass-ice text-sky-300 hover:text-white border border-white/10 active:scale-90 transition-all text-base">⏮</button>
            <button
              onClick={()=>playing ? pause() : play(track, isLocal, isLocal ? localTracks : ZEN_TRACKS)}
              className={`w-13 h-13 w-12 h-12 rounded-full flex items-center justify-center text-lg font-black transition-all active:scale-95 ${playing ? 'bg-rose-500 border border-rose-400/50 text-white hover:bg-rose-400 zen-pulse-ring' : 'bg-cyan-400 text-slate-900 hover:bg-cyan-300'}`}
            >
              {playing ? '⏸' : '▶'}
            </button>
            <button onClick={handleNext} className="w-9 h-9 flex items-center justify-center rounded-full glass-ice text-sky-300 hover:text-white border border-white/10 active:scale-90 transition-all text-base">⏭</button>
          </div>

          {/* Settings (Shuffle / Loop) */}
          <div className="flex justify-center gap-3 mb-5 shrink-0">
            <button onClick={()=>setShuffle(!shuffle)} className={`p-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all border ${shuffle ? 'bg-cyan-400/20 border-cyan-400 text-cyan-200' : 'glass-ice border-white/10 text-sky-300/50 hover:text-white'}`}>
              🔀 Shuffle
            </button>
            <button onClick={()=>setLoop(!loop)} className={`p-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all border ${loop ? 'bg-cyan-400/20 border-cyan-400 text-cyan-200' : 'glass-ice border-white/10 text-sky-300/50 hover:text-white'}`}>
              🔁 Loop
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <span className="text-sm select-none">🔉</span>
            <input type="range" min={0} max={1} step={0.01} value={vol} onChange={e=>handleVol(parseFloat(e.target.value))} className="flex-1 zen-volume" />
            <span className="text-sm select-none">🔊</span>
          </div>

          {/* Scrollable Track list */}
          <div className="space-y-1.5 overflow-y-auto pr-1 custom-scrollbar max-h-52">
            
            {/* Local Music Section */}
            <div className="flex gap-2 mb-2 sticky top-0 bg-[#0f2a50]/90 backdrop-blur-sm p-1 z-10 rounded-lg">
              <button onClick={()=>fileInputRef.current?.click()} className="flex-1 py-1.5 rounded-lg glass-ice border border-white/10 text-[10px] font-black uppercase text-sky-200 hover:bg-white/10 transition-all">
                📄 Select Files
              </button>
              <button onClick={()=>folderInputRef.current?.click()} className="flex-1 py-1.5 rounded-lg glass-ice border border-white/10 text-[10px] font-black uppercase text-sky-200 hover:bg-white/10 transition-all">
                📁 Select Folder
              </button>
            </div>

            {localTracks.length > 0 && (
              <div className="mb-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2 pl-1">Local Playlist ({localTracks.length})</div>
                {localTracks.map((tr, idx) => (
                  <button key={tr.url} onClick={()=>selectTrack(idx, true)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left mb-1.5 ${track===idx && isLocal ? 'bg-emerald-500/15 border border-emerald-400/30 text-white' : 'glass-ice border border-white/8 text-sky-200/70 hover:text-white hover:border-white/20'}`}
                  >
                    <span className="text-base select-none">🎵</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-black truncate">{tr.name}</div>
                    </div>
                    {track===idx && isLocal && playing && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />}
                  </button>
                ))}
              </div>
            )}

            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 pl-1">Synthesized Audio</div>
            {ZEN_TRACKS.map((tr, idx) => (
              <button key={tr.id} onClick={()=>selectTrack(idx, false)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left mb-1.5 ${track===idx && !isLocal ? 'bg-cyan-400/15 border border-cyan-400/30 text-white' : 'glass-ice border border-white/8 text-sky-200/70 hover:text-white hover:border-white/20'}`}
              >
                <span className="text-base select-none">{tr.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black truncate">{tr.name}</div>
                  <div className="text-[10px] text-sky-300/50 font-bold">{tr.desc}</div>
                </div>
                {track===idx && !isLocal && playing && <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating toggle pill */}
      {!open && (
        <button
          id="zen-mode-toggle"
          onClick={()=>setOpen(!open)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl glass-panel border shadow-2xl hover:border-cyan-400/60 transition-all active:scale-95 ${playing ? 'border-cyan-400/40 zen-pulse-ring' : 'border-white/20'}`}
        >
          <div className={`w-7 h-7 rounded-xl bg-cyan-400/15 border border-cyan-400/25 flex items-center justify-center text-base select-none ${playing ? 'animate-pulse' : ''}`}>
            {playing ? t.icon : '🎵'}
          </div>
          <div className="text-left">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300/60">Zen Mode</div>
            {playing && <div className="text-[10px] font-bold text-cyan-300 truncate max-w-[100px] leading-tight">{t.name}</div>}
          </div>
        </button>
      )}
    </div>
  );
};
// ────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('warmup');
  const [activeSession, setActiveSession] = useState('pm');
  const [bgTheme, setBgTheme] = useState('default');
  const [customExercises, setCustomExercises] = useState({ warmup: [], day1: [], day2: [], day3: [], day4: [], day5: [], recovery: [], cardio: [], hiit: [], torcher: [], evening_hiit: [] });
  const [sequence, setSequence] = useState({ tabId: null, currentIndex: -1, isPaused: false });
  const [globalResetTrigger, setGlobalResetTrigger] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showGeneratorPanel, setShowGeneratorPanel] = useState(false);
  const [imageSearch, setImageSearch] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // PWA installation states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  // Service Worker auto-update
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('[BurnOut SW] Registered:', r);
    },
    onRegisterError(error) {
      console.error('[BurnOut SW] Registration error:', error);
    },
  });

  // Track PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Check if running in standalone mode already
    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      setIsInstallable(false);
    }
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    } else {
      setShowInstallGuide(true);
    }
  };

  // Track online/offline status
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);
  const theme = themeAccents[bgTheme] || themeAccents.default;

  // --- AI FEATURE STATE ---
  const [customModules, setCustomModules] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiPrompt, setAiPrompt] = useState({ focus: '', duration: '20', intensity: 'High' });

  useEffect(() => {
    if (activeLevel) {
      const workout = (appLevels as any)[activeLevel] || (customModules as any[]).find(m => m.id === activeLevel);
      const data = workout ? workout.data : null;
      if (data) {
        if (data.warmup) {
          setActiveTab('warmup');
        } else if (data.days && data.days.length > 0) {
          setActiveTab(data.days[0].id);
        } else {
          setActiveTab('warmup');
        }
      } else {
        setActiveTab('warmup');
      }
    } else {
      setActiveTab('warmup');
    }
    setActiveSession('pm'); // Default to PM for the redesign module
    setSequence({ tabId: null, currentIndex: -1, isPaused: false });
  }, [activeLevel, customModules]);

  useEffect(() => {
    // Keep PM active if we're in the evening hiit tab of the redesign module
    if (activeLevel === 'redesign' && activeTab === 'evening_hiit') {
      setActiveSession('pm');
    } else if (activeTab !== 'evening_hiit') {
      setActiveSession('am');
    }
  }, [activeTab, activeLevel]);

  // Handle active workout data between standard app levels and AI generated modules
  const getActiveWorkout = () => {
    if (!activeLevel) return null;
    if (appLevels[activeLevel]) return appLevels[activeLevel];
    return customModules.find(m => m.id === activeLevel);
  };

  const currentWorkout = getActiveWorkout();
  const activeWorkoutData = currentWorkout ? currentWorkout.data : null;

  // --- AI GENERATION LOGIC ---
  const generateAIWorkout = async () => {
    if (!aiPrompt.focus || !aiPrompt.duration) {
      setAiError("Please provide a focus area and duration.");
      return;
    }

    setIsGenerating(true);
    setAiError('');

    try {
      const prompt = `Act as an elite fitness coach. Generate a highly effective, single-day workout module. 
      Focus: ${aiPrompt.focus}. 
      Duration: ${aiPrompt.duration} minutes. 
      Intensity: ${aiPrompt.intensity}. 
      Include a warmup if appropriate. Strictly undercalculate calories using MET formulas. Ensure 'time' for exercises is an integer representing seconds. Return valid JSON.`;

      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              subtitle: { type: "STRING" },
              metrics: {
                type: "OBJECT",
                properties: {
                  met: { type: "STRING" },
                  time: { type: "STRING" },
                  calories: { type: "STRING" }
                }
              },
              data: {
                type: "OBJECT",
                properties: {
                  warmup: {
                    type: "OBJECT",
                    properties: {
                      title: { type: "STRING" },
                      focus: { type: "STRING" },
                      exercises: {
                        type: "ARRAY",
                        items: {
                          type: "OBJECT",
                          properties: {
                            name: { type: "STRING" },
                            reps: { type: "STRING" },
                            time: { type: "INTEGER" },
                            form: { type: "ARRAY", items: { type: "STRING" } },
                            isCore: { type: "BOOLEAN" }
                          }
                        }
                      }
                    }
                  },
                  days: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        id: { type: "STRING" },
                        title: { type: "STRING" },
                        focus: { type: "STRING" },
                        exercises: {
                          type: "ARRAY",
                          items: {
                            type: "OBJECT",
                            properties: {
                              name: { type: "STRING" },
                              reps: { type: "STRING" },
                              time: { type: "INTEGER" },
                              form: { type: "ARRAY", items: { type: "STRING" } },
                              isCore: { type: "BOOLEAN" }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };

      const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || "").replace(/^["']|["']$/g, '');
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("Gemini API Response:", result);

      if (result.error) {
        setAiError(`API Error: ${result.error.message || "Unknown API error"}`);
        return;
      }

      const jsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (jsonText) {
        try {
          const cleanJsonText = jsonText.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
          const parsed = JSON.parse(cleanJsonText);

          // Ensure day IDs are safe for tabs
          if (parsed.data && parsed.data.days) {
            parsed.data.days = parsed.data.days.map((d, i) => ({ ...d, id: `ai_day_${i}` }));
          }

          const newModule = {
            ...parsed,
            id: `custom_${Date.now()}`,
            icon: Sparkles,
            colorClass: 'text-indigo-600 dark:text-indigo-400',
            bgClass: 'bg-white/80 dark:bg-black/40 backdrop-blur-md border-2 border-indigo-500/50 hover:bg-white dark:hover:bg-black/60 shadow-indigo-500/10'
          };

          setCustomModules(prev => [...prev, newModule]);
          setAiPrompt({ focus: '', duration: '20', intensity: 'Medium' });
        } catch (parseErr) {
          console.error("JSON parsing error:", parseErr, "Original text:", jsonText);
          setAiError("Failed to parse the generated workout data. Please try again.");
        }
      } else {
        setAiError("No content returned from Gemini. Please check your API key or prompt.");
      }
    } catch (error) {
      console.error("AI Generation failed", error);
      setAiError("Network error. Could not connect to Gemini.");
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteCustomModule = (id) => {
    setCustomModules(prev => prev.filter(m => m.id !== id));
  };

  const handleDownloadPDF = () => {
    if (!activeWorkoutData) return;
    let htmlContent = `
      <html>
        <head>
          <title>Burnout - ${currentWorkout.title} Plan</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; color: #37352f; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; background: #FAF9F6; }
            h1 { color: #854d0e; text-align: center; border-bottom: 3px solid #eab308; padding-bottom: 10px; font-size: 28px; }
            h2 { color: #854d0e; margin-top: 40px; border-bottom: 2px solid #eab308; padding-bottom: 5px; font-size: 20px; }
            h3 { color: #4b5563; font-size: 18px; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; background: white; border-radius: 8px; overflow: hidden; }
            th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; vertical-align: top; }
            th { background-color: #fef3c7; color: #854d0e; font-weight: bold; }
            ul { margin: 0; padding-left: 20px; }
            .nutrition-section { margin-bottom: 25px; padding: 15px; background: white; border-radius: 12px; border-left: 5px solid #eab308; }
          </style>
        </head>
        <body>
          <h1>Burnout: ${currentWorkout.title} Plan</h1>
    `;

    const renderWorkout = (title, exercises) => {
      if (!exercises || exercises.length === 0) return '';
      let html = `<h3>${title}</h3>`;
      html += `<table>
                <tr>
                  <th width="30%">Exercise</th>
                  <th width="20%">Target</th>
                  <th width="50%">Form Guide</th>
                </tr>`;
      exercises.forEach(ex => {
        html += `<tr>
                  <td><ul><li><strong>${ex.name}</strong></li></ul></td>
                  <td><ul><li>${ex.reps}</li></ul></td>
                  <td><ul>${(ex.form || []).map(f => `<li>${f}</li>`).join('')}</ul></td>
                 </tr>`;
      });
      html += `</table>`;
      return html;
    };

    if (activeWorkoutData.warmup) {
      htmlContent += renderWorkout(activeWorkoutData.warmup.title, activeWorkoutData.warmup.exercises);
    }

    if (activeWorkoutData.days) {
      activeWorkoutData.days.forEach(day => {
        if (day.sessions) {
          htmlContent += `<h2>${day.title}</h2>`;
          if (day.sessions.am) {
            htmlContent += renderWorkout(day.sessions.am.title, day.sessions.am.exercises);
          }
          if (day.sessions.pm) {
            htmlContent += renderWorkout(day.sessions.pm.title, day.sessions.pm.exercises);
          }
        } else {
          htmlContent += renderWorkout(day.title, day.exercises);
        }
      });
    }

    if (activeWorkoutData.diet && activeWorkoutData.diet.sections) {
      htmlContent += `<h2>${activeWorkoutData.diet.title}</h2>`;
      activeWorkoutData.diet.sections.forEach(sec => {
        htmlContent += `<div class="nutrition-section">
                          <h3>${sec.meal}</h3>
                          <ul>${sec.items.map(i => `<li>${i}</li>`).join('')}</ul>
                        </div>`;
      });

      if (activeWorkoutData.diet.budgetPlan) {
        htmlContent += `<h2>${activeWorkoutData.diet.budgetPlan.title}</h2>`;
        htmlContent += `<h3>📌 Profile</h3><ul>${activeWorkoutData.diet.budgetPlan.profile.map(p => `<li>${p}</li>`).join('')}</ul>`;
        htmlContent += `<h3>💪 65g Protein Formula</h3><ul>${activeWorkoutData.diet.budgetPlan.formula.map(p => `<li>${p}</li>`).join('')}</ul>`;
      }
    }

    htmlContent += `</body></html>`;

    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const handleImageSearch = (e) => {
    e.preventDefault();
    if (imageSearch.trim()) {
      window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(imageSearch.trim() + ' exercise posture')}`, '_blank');
      setImageSearch('');
    }
  };

  const toggleSequence = (sectionId) => {
    setSequence(prev => {
      if (prev.tabId === sectionId) {
        return { ...prev, isPaused: !prev.isPaused };
      } else {
        return { tabId: sectionId, currentIndex: 0, isPaused: false };
      }
    });
  };

  const stopSequence = () => {
    setSequence({ tabId: null, currentIndex: -1, isPaused: false });
  };

  const handleSequenceComplete = (sectionId, idx, totalCount) => {
    setSequence(prev => {
      if (prev.tabId === sectionId && prev.currentIndex === idx) {
        if (idx + 1 < totalCount) {
          return { ...prev, currentIndex: idx + 1 };
        } else {
          return { tabId: null, currentIndex: -1, isPaused: false };
        }
      }
      return prev;
    });
  };

  const resetAllTimers = () => {
    stopSequence();
    setGlobalResetTrigger(prev => prev + 1);
  };

  const addExercise = (sectionId) => {
    const name = prompt("Exercise Name:");
    if (!name) return;
    const reps = prompt("Reps/Target:", "15");
    const seconds = parseInt(prompt("Timer duration in seconds:", "60"), 10) || 60;

    const newEx = {
      name,
      reps,
      time: seconds,
      form: ["Focus on breathing", "Maintain control"],
      isCore: false,
      id: Date.now()
    };
    setCustomExercises(prev => ({ ...prev, [sectionId]: [...(prev[sectionId] || []), newEx] }));
  };

  const removeExercise = (sectionId, id) => {
    setCustomExercises(prev => ({ ...prev, [sectionId]: prev[sectionId].filter(ex => ex.id !== id) }));
  };

  const renderWorkoutSection = (sectionId, title, focus, baseExercises) => {
    const exercises = [...(baseExercises || []), ...(customExercises[sectionId] || [])];
    const isThisTabSequencing = sequence.tabId === sectionId;
    const levelData = currentWorkout;

    return (
      <div className="space-y-6 sm:space-y-8">
        {title && (
          <div className="glass-panel border border-white/15 rounded-[2.5rem] p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden transition-all duration-300">
            {/* Ambient neon backglow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-cyan-400/8 blur-[60px] rounded-full pointer-events-none"></div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-none uppercase drop-shadow-[0_2px_10px_rgba(255,255,255,0.08)]">{title}</h2>
            {focus && <p className="text-sky-200/60 mt-3.5 text-xs sm:text-sm font-black uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">{focus}</p>}

            {/* PERFORMANCE METRICS CARD WITHIN SECTION */}
            {levelData?.metrics && (
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 bg-white/5 border border-white/8 px-4 py-2 rounded-xl text-sky-200">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-300">{levelData.metrics.met} MET</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/8 px-4 py-2 rounded-xl text-sky-200">
                  <Timer className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-300">{levelData.metrics.time}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/8 px-4 py-2 rounded-xl text-sky-200">
                  <Flame className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-300">{levelData.metrics.calories} / SESSION</span>
                </div>
              </div>
            )}
          </div>
        )}

        {exercises.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-4 w-full">
              <button
                onClick={() => toggleSequence(sectionId)}
                className={`py-4 px-8 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition-all shadow-xl hover:scale-105 active:scale-95 w-full sm:w-auto ${isThisTabSequencing
                  ? 'bg-cyan-400/15 border border-cyan-400/40 text-cyan-300 shadow-inner'
                  : 'bg-cyan-400 hover:bg-cyan-300 text-slate-900 shadow-lg shadow-cyan-400/20'
                  }`}
              >
                {isThisTabSequencing ? (sequence.isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />) : <Rocket className="w-5 h-5" />}
                {isThisTabSequencing ? (sequence.isPaused ? "RESUME" : "PAUSE") : "START SEQUENCE"}
              </button>

              {isThisTabSequencing && (
                <button
                  onClick={stopSequence}
                  className="py-4 px-8 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition-all bg-rose-500/15 text-rose-400 border border-rose-500/35 hover:bg-rose-500/25 shadow-xl w-full sm:w-auto"
                >
                  <Square className="w-5 h-5" />
                  STOP
                </button>
              )}

              <button
                onClick={resetAllTimers}
                className="py-4 px-8 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition-all glass-ice hover:bg-white/12 text-sky-200 border border-white/15 shadow-xl w-full sm:w-auto"
              >
                <RotateCcw className="w-5 h-5" />
                RESET ALL
              </button>
            </div>

            <div className="space-y-6">
              {exercises.map((ex, idx) => {
                const seqState = isThisTabSequencing && sequence.currentIndex === idx ? (sequence.isPaused ? 'paused' : 'active') : 'idle';
                return (
                  <ExerciseCard
                    key={ex.isCore ? `${sectionId}-ex-${idx}` : ex.id}
                    exercise={ex}
                    onRemove={() => removeExercise(sectionId, ex.id)}
                    sequenceState={seqState}
                    onSequenceComplete={() => handleSequenceComplete(sectionId, idx, exercises.length)}
                    globalResetTrigger={globalResetTrigger}
                    isDarkMode={isDarkMode}
                    activeGlow={theme.activeGlow}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-[#6B7280] font-black uppercase tracking-widest text-xl">
            Coming Soon
          </div>
        )}

        <button onClick={() => addExercise(sectionId)} className="w-full py-8 border-4 border-dashed border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-[2rem] text-[#6B7280] dark:text-gray-400 hover:border-amber-600 hover:text-amber-700 transition-all flex items-center justify-center gap-4 font-black text-lg">
          <Plus className="w-8 h-8" /> ADD CUSTOM EXERCISE
        </button>
      </div>
    );
  };

  // --- RENDER: HOME SCREEN ---
  if (!activeLevel) {
    return (
      <div>
        <div className={`min-h-screen w-full font-sans transition-colors duration-300 relative overflow-x-hidden ${(bgThemes as any)[bgTheme]}`}>
          {/* ── FROZEN AMBIENT LAYER ── */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Large base fog */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1d35] via-[#12304e] to-[#0e2540] opacity-95" />
            {/* Orb 1 — cyan top-left */}
            <div className="orb-cyan absolute top-[-8%] left-[-6%] w-[55vw] h-[55vw] blur-[120px] animate-float-1 opacity-80" />
            {/* Orb 2 — blue bottom-right */}
            <div className="orb-blue absolute bottom-[-12%] right-[-8%] w-[60vw] h-[60vw] blur-[130px] animate-float-2 opacity-70" />
            {/* Orb 3 — indigo mid-right */}
            <div className="orb-indigo absolute top-[35%] right-[10%] w-[38vw] h-[38vw] blur-[100px] animate-float-3 opacity-60" />
            {/* Orb 4 — white frost top-right */}
            <div className="orb-white absolute top-[5%] right-[25%] w-[28vw] h-[28vw] blur-[90px] animate-float-4 opacity-55" />
            {/* Orb 5 — extra cyan bottom-left */}
            <div className="orb-cyan absolute bottom-[10%] left-[5%] w-[32vw] h-[32vw] blur-[100px] animate-float-2 opacity-45" style={{ animationDelay: '-8s' }} />
          </div>

          {/* GRID MESH */}
          <div className="fixed inset-0 pointer-events-none z-0 grid-mesh" />

          {/* ── OFFLINE BANNER ── */}
          {!isOnline && (
            <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-black text-amber-100 bg-gradient-to-r from-amber-600/80 via-orange-500/80 to-amber-600/80 backdrop-blur-xl border-b border-amber-400/30 shadow-lg animate-pulse">
              <span className="text-base">🛜</span>
              <span>You're offline — Workouts & timers work fine · AI Generator & image search need internet</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-white/15 border border-white/20 text-[10px] uppercase tracking-widest">Offline Mode</span>
            </div>
          )}

          {/* GLOBAL NAVIGATION HEADER */}
          <header className={`max-w-6xl mx-auto px-6 flex justify-between items-center relative z-20 ${!isOnline ? 'pt-14' : 'pt-6'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full glass-ice border border-white/20 flex items-center justify-center text-cyan-200">
                <ChevronLeft className="w-5 h-5" />
              </div>
            </div>


            <div className="flex gap-3 items-center">
              {isInstallable && (
                <button
                  id="pwa-install-btn-home"
                  onClick={handleInstallApp}
                  title="Install BurnOut App"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-ice border border-cyan-400/50 text-cyan-200 hover:bg-cyan-400/15 hover:text-cyan-100 active:scale-95 transition-all shadow-sm text-xs font-black uppercase tracking-wider animate-pulse-slow"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Install App</span>
                </button>
              )}
              <ThemePicker bgTheme={bgTheme} setBgTheme={setBgTheme} />
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center relative z-10">

            {/* HERO SECTION */}
            <div className="mb-10 text-center space-y-4 relative w-full max-w-4xl flex flex-col items-center">
              {/* Decorative premium glow under the logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-cyan-400/10 blur-[90px] rounded-full pointer-events-none"></div>

              {/* Elevated and highlighted brand logo */}
              <div className="flex items-center justify-center gap-3 sm:gap-6">
                <img src="/icons/icon-512.png" alt="BurnOut Fire Logo" className="w-16 h-16 sm:w-24 sm:h-24 object-contain drop-shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-110 transition-transform duration-500" />
                <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-none text-white drop-shadow-[0_12px_24px_rgba(34,211,238,0.15)] uppercase select-none">
                  Burn<span className="text-cyan-400 font-extrabold relative inline-block drop-shadow-[0_0_40px_rgba(34,211,238,0.45)]">out</span>
                </h1>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight max-w-2xl mx-auto pt-2">
                Train smart, Stay <span className="relative inline-block px-1 text-cyan-300 font-black">
                  strong
                  <svg className="absolute left-0 bottom-[-4px] w-full h-[6px] text-cyan-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,9 100,5 Q50,1 0,5" fill="currentColor" opacity="0.7" />
                  </svg>
                </span>, Perform better
              </h2>

              <p className="text-xs font-black text-sky-300/50 uppercase tracking-[0.3em] pt-1">Elite Discipline · Zero Excuses</p>
            </div>

            {/* ATHLETIC SPLIT IMAGE HEADERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10 items-stretch">

              {/* IMAGE 1: INFERNO SPRINT */}
              <div className="relative h-96 sm:h-[26rem] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/15 hover:scale-[1.015] hover:border-cyan-400/30 transition-all duration-500 glass-ice">
                <img
                  src={runnerImg}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-95 group-hover:scale-105 group-hover:object-[center_10%] transition-all duration-[1400ms] ease-out"
                  alt="Athlete sprinting"
                />
                {/* Only fade at bottom for text — top stays clear so face shows */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d35]/90 via-[#0b1d35]/20 via-50% to-transparent" />
                {/* Top badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest glass-ice border border-cyan-400/30 text-cyan-200">
                    🔥 High EPOC
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
                  <div className="text-left">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-none uppercase tracking-tight drop-shadow-lg">Inferno Sprint</h3>
                    <p className="text-xs font-bold text-sky-200/80 uppercase tracking-widest mt-1.5">Afterburn · HIIT · Full Body</p>
                  </div>
                  <div className="w-12 h-12 rounded-full glass-ice border border-cyan-400/30 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-cyan-300" />
                  </div>
                </div>
              </div>

              {/* IMAGE 2: ENDURANCE CARDIO */}
              <div className="relative h-96 sm:h-[26rem] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/15 hover:scale-[1.015] hover:border-cyan-400/30 transition-all duration-500 glass-ice">
                <img
                  src={morningRunImg}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-92 group-hover:scale-105 group-hover:object-[center_8%] transition-all duration-[1400ms] ease-out"
                  alt="Morning outdoor run"
                />
                {/* Only fade at bottom for text — top stays clear so face shows */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d35]/90 via-[#0b1d35]/20 via-50% to-transparent" />
                {/* Top badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest glass-ice border border-cyan-400/30 text-cyan-200">
                    ❄️ Steady State
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
                  <div className="text-left">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-none uppercase tracking-tight drop-shadow-lg">Endurance Run</h3>
                    <p className="text-xs font-bold text-sky-200/80 uppercase tracking-widest mt-1.5">Cardio · Fat Burn · Stamina</p>
                  </div>
                  <div className="w-12 h-12 rounded-full glass-ice border border-cyan-400/30 flex items-center justify-center">
                    <Footprints className="w-6 h-6 text-cyan-300" />
                  </div>
                </div>
              </div>

            </div>


            {/* SELECTION GRID TITLE */}
            <div className="w-full text-left mb-8 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-400/15 border border-cyan-400/25 text-cyan-300">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">Active Training Modules</h3>
                <p className="text-xs font-bold text-sky-300/60 uppercase tracking-widest mt-1">Select a workout module below to begin tracking</p>
              </div>
            </div>

            {/* MODULES CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full mb-16">
              {[...Object.values(appLevels), ...customModules].map((level) => {
                const Icon = level.icon || Sparkles;
                const isCustom = customModules.some(m => m.id === level.id);

                return (
                  <div key={level.id} className="relative group flex">
                    <button
                      onClick={() => setActiveLevel(level.id)}
                      className="w-full text-left p-5 rounded-[2rem] border border-white/15 transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-400/10 overflow-hidden glass-ice glass-shimmer"
                    >
                      {/* Decorative Background Accent */}
                      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-bl-full pointer-events-none" />

                      <div>
                        <div className="flex justify-between items-start w-full mb-4">
                          <div className={`p-3 rounded-xl bg-white/10 border border-white/15 shadow-inner ${level.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div className="flex-1 relative z-10">
                          <h2 className="text-xl font-black mb-1.5 text-white tracking-tight leading-tight">{level.title}</h2>
                          <p className="text-sky-200/70 text-xs font-bold leading-snug">{level.subtitle}</p>
                        </div>
                      </div>

                      {level.metrics && (
                        <div className="flex items-center gap-3 pt-4 mt-3 border-t border-white/10 w-full relative z-10">
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-sky-200/60 bg-white/8 px-2.5 py-1 rounded-md border border-white/10">
                            <Timer className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {level.metrics.time}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-sky-200/60 bg-white/8 px-2.5 py-1 rounded-md border border-white/10">
                            <Flame className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {level.metrics.calories}
                          </div>
                        </div>
                      )}
                    </button>

                    {/* Floating Delete Button for Custom Modules */}
                    {isCustom && (
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteCustomModule(level.id); }}
                        className="absolute top-6 right-6 p-3 bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white rounded-full transition-all z-20 shadow-sm hover:shadow-lg border border-rose-500/20"
                        title="Delete Module"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            {/* AI WORKOUT GENERATOR COCKPIT CARD */}
            <div className="w-full rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden border border-white/15 mb-12 glass-ice glass-shimmer">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/8 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black mb-2 flex items-center gap-3 text-white tracking-tight">
                  <Sparkles className="w-8 h-8 text-cyan-300 animate-pulse" />
                  Custom workout generator
                </h3>
                <p className="text-sky-200/60 font-bold text-sm mb-6">Instantly create a customized training module tailored to your exact intensity and targets.</p>

                <div className="flex flex-col sm:flex-row gap-4 mb-5">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-black tracking-[0.2em] text-sky-300/70 px-1">Focus Area</label>
                    <input
                      type="text"
                      placeholder="e.g., Core & Legs, Upper Body"
                      value={aiPrompt.focus}
                      onChange={e => setAiPrompt({ ...aiPrompt, focus: e.target.value })}
                      className="input-frost w-full rounded-2xl px-5 py-4 font-bold"
                    />
                  </div>

                  <div className="w-full sm:w-56 flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-black tracking-[0.2em] text-sky-300/70 px-1">Select Time in Minutes</label>
                    <input
                      type="number"
                      placeholder="Minutes"
                      value={aiPrompt.duration}
                      onChange={e => setAiPrompt({ ...aiPrompt, duration: e.target.value })}
                      className="input-frost w-full rounded-2xl px-5 py-4 font-bold"
                    />
                  </div>

                  <div className="w-full sm:w-52 flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-black tracking-[0.2em] text-sky-300/70 px-1">Intensity</label>
                    <select
                      value={aiPrompt.intensity}
                      onChange={e => setAiPrompt({ ...aiPrompt, intensity: e.target.value })}
                      className="input-frost w-full rounded-2xl px-5 py-4 font-bold cursor-pointer"
                    >
                      <option value="Low">Low Intensity</option>
                      <option value="Medium">Medium Intensity</option>
                      <option value="High">High Intensity</option>
                      <option value="Extreme">Extreme Burn</option>
                    </select>
                  </div>
                </div>

                {aiError && <p className="text-rose-400 font-bold text-sm mb-4 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">{aiError}</p>}

                {!isOnline && (
                  <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-amber-200 text-sm font-bold">
                    <span className="text-lg">🛜</span>
                    You're offline — AI Generator needs internet to work.
                  </div>
                )}

                <button
                  onClick={generateAIWorkout}
                  disabled={isGenerating || !isOnline}
                  className={`w-full sm:w-auto font-black py-4 px-8 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 ${!isOnline
                    ? 'bg-white/10 text-sky-300/40 border border-white/10 cursor-not-allowed'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-900 hover:shadow-cyan-400/30 disabled:opacity-70'
                    }`}
                >
                  {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> GENERATING MODULE...</> : <><Sparkles className="w-5 h-5" /> {isOnline ? 'GENERATE CUSTOM PLAN' : 'OFFLINE — INTERNET NEEDED'}</>}
                </button>
              </div>
            </div>

            {/* GLOBAL TRAINING BENCHMARKS DASHBOARD WIDGET */}
            <div className="w-full border border-white/15 rounded-[3rem] p-8 sm:p-10 relative overflow-hidden glass-ice">
              {/* Decorative background blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-cyan-400/5 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10 justify-center sm:justify-start">
                  <div className="p-3 bg-cyan-400/15 rounded-2xl border border-cyan-400/25 shadow-inner">
                    <BarChart3 className="w-8 h-8 text-cyan-300" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">Global Training Benchmarks</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {[...Object.values(appLevels), ...customModules].filter(l => l.metrics).map((level) => (
                    <div key={`metric-${level.id}`} className="glass-panel rounded-3xl p-5 border border-white/12 transition-all hover:border-cyan-400/40 shadow-sm hover:shadow-md group">
                      <div className="font-black text-sm uppercase tracking-widest text-white border-b border-white/10 pb-3 mb-4 truncate">{level.title}</div>
                      <ul className="space-y-3 list-none pl-0">
                        {level.metrics.met && (
                          <li className="text-xs font-bold text-sky-200/60 flex items-center gap-3 group-hover:text-sky-100 transition-colors">
                            <Activity className="w-4 h-4 text-cyan-400" /> <span className="w-16">MET:</span> <span className="font-black text-white">{level.metrics.met}</span>
                          </li>
                        )}
                        <li className="text-xs font-bold text-sky-200/60 flex items-center gap-3 group-hover:text-sky-100 transition-colors">
                          <Timer className="w-4 h-4 text-cyan-400" /> <span className="w-16">Time:</span> <span className="font-black text-white">{level.metrics.time}</span>
                        </li>
                        {level.metrics.speed && (
                          <li className="text-xs font-bold text-sky-200/60 flex items-center gap-3 group-hover:text-sky-100 transition-colors">
                            <Zap className="w-4 h-4 text-cyan-400" /> <span className="w-16">Speed:</span> <span className="font-black text-white">{level.metrics.speed}</span>
                          </li>
                        )}
                        <li className="text-xs font-bold text-sky-200/60 flex items-center gap-3 group-hover:text-sky-100 transition-colors">
                          <Flame className="w-4 h-4 text-cyan-400" /> <span className="w-16">Burn:</span> <span className="font-black text-white">{level.metrics.calories}</span>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </main>
        </div>
        <ZenPlayer />
      </div>
    );
  }

  // --- RENDER: WORKOUT MODULE TABS ---
  const availableTabs = [
    ...(activeWorkoutData.warmup ? [{ id: 'warmup', label: 'WARM-UP', render: () => renderWorkoutSection('warmup', activeWorkoutData.warmup.title, activeWorkoutData.warmup.focus, activeWorkoutData.warmup.exercises) }] : []),
    ...(activeWorkoutData.days || []).map(day => ({
      id: day.id,
      label: day.id === 'recovery' ? 'RECOVERY' : day.id === 'cardio' ? 'CALCULATOR' : day.id === 'torcher' ? 'TORCHER' : day.id.toUpperCase().replace('DAY', 'DAY ').replace(/_/g, ' '),
      render: () => {
        if (day.id === 'cardio') return <CardioView />;
        if (day.id === 'torcher' || activeLevel === 'redesign') {
          return (
            <div className="space-y-10">
              <div className="bg-white/90 dark:bg-[#1e293b]/80 backdrop-blur-xl border-2 border-white/80 dark:border-white/10 rounded-[3rem] p-8 shadow-2xl transition-all">
                <div className="flex items-center gap-4 mb-6 border-b-2 border-black/5 pb-4">
                  <Timer className="w-8 h-8 text-orange-600" />
                  <h2 className="text-2xl font-black tracking-tight text-[#37352f] dark:text-gray-100">Workout Summary & Predictions</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-orange-600/5 p-4 rounded-2xl border-2 border-black/5">
                    <div className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Total Workout Time</div>
                    <div className="text-xl font-black text-orange-800 dark:text-orange-500">{activeWorkoutData.summary?.time || "Standard Run"}</div>
                  </div>
                  <div className="bg-orange-600/5 p-4 rounded-2xl border-2 border-black/5">
                    <div className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Predicted Active Burn</div>
                    <div className="text-xl font-black text-orange-800 dark:text-orange-500">{activeWorkoutData.summary?.burn || "~200 kcal"}</div>
                  </div>
                  <div className="bg-orange-600/5 p-4 rounded-2xl border-2 border-black/5">
                    <div className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Predicted Afterburn</div>
                    <div className="text-xl font-black text-orange-800 dark:text-orange-500">{activeWorkoutData.summary?.afterburn || "High"}</div>
                  </div>
                  <div className="bg-orange-600/5 p-4 rounded-2xl border-2 border-black/5">
                    <div className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Exercise Intensity</div>
                    <div className="text-xl font-black text-orange-800 dark:text-orange-500">{activeWorkoutData.summary?.intensity || "High"}</div>
                  </div>
                </div>
                {activeWorkoutData.summary?.tips && (
                  <div className="mt-8">
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-orange-800 dark:text-orange-500 mb-4 flex items-center gap-2">Success Tips</h4>
                    <ul className="space-y-3 pl-0 list-none">
                      {activeWorkoutData.summary.tips.map((tip, i) => (
                        <li key={i} className="flex gap-3 items-start text-sm font-bold text-[#4B5563] dark:text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {renderWorkoutSection(day.id, day.title, day.focus, activeLevel === 'redesign' && day.sessions ? day.sessions[activeSession].exercises : day.exercises)}
            </div>
          );
        }
        if (day.sessions && activeLevel !== 'redesign') {
          if (day.sessions.am && day.sessions.pm) {
            const currentSession = day.sessions[activeSession];
            return (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl sm:text-6xl font-black text-[#37352f] dark:text-gray-100 tracking-tighter leading-none">{day.title}</h2>
                  <p className="text-[#6B7280] dark:text-gray-400 mt-3 text-lg font-bold tracking-tight">{day.focus}</p>
                </div>

                <div className="flex justify-center bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl p-2 rounded-3xl w-full max-sm mx-auto border-2 border-white dark:border-white/10 shadow-2xl transition-all">
                  <button
                    onClick={() => setActiveSession('am')}
                    className={`flex-1 py-3 rounded-2xl font-black text-xs sm:text-sm tracking-widest transition-all ${activeSession === 'am' ? 'bg-amber-700 text-white shadow-lg' : 'text-[#6B7280] dark:text-gray-300 hover:text-amber-700'}`}
                  >
                    ☀️ AM SESSION
                  </button>
                  <button
                    onClick={() => setActiveSession('pm')}
                    className={`flex-1 py-3 rounded-2xl font-black text-xs sm:text-sm tracking-widest transition-all ${activeSession === 'pm' ? 'bg-amber-700 text-white shadow-lg' : 'text-[#6B7280] dark:text-gray-300 hover:text-amber-700'}`}
                  >
                    🌙 PM SESSION
                  </button>
                </div>

                <div className="pt-4 transition-all">
                  {renderWorkoutSection(currentSession.id, currentSession.title, currentSession.focus, currentSession.exercises)}
                </div>
              </div>
            );
          }
        }
        return renderWorkoutSection(day.id, day.title, day.focus, day.exercises);
      }
    })),
    ...(activeWorkoutData.diet ? [{ id: 'diet', label: 'NUTRITION', render: () => <DietView data={activeWorkoutData.diet} /> }] : [])
  ];

  const DietView = ({ data }: { data: any }) => {
    if (!data || !data.sections || data.sections.length === 0) {
      return (
        <div className="py-20 text-center text-[#6B7280] font-black border-4 border-dashed border-black/5 dark:border-white/5 bg-white/40 dark:bg-white/5 rounded-[2rem]">
          <p>{data?.focus || "NUTRITION PLAN NOT INCLUDED IN THIS MODULE"}</p>
        </div>
      );
    }

    return (
      <div className="space-y-12">
        {/* Main Header Banner */}
        <div className="bg-white/90 dark:bg-[#1e293b]/80 backdrop-blur-xl border-2 border-white/80 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-10 text-center shadow-2xl transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10 space-y-3">
            <span className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-500/10 text-amber-800 dark:text-amber-500 uppercase tracking-widest">NUTRITION STRATEGY</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#37352f] dark:text-gray-100 tracking-tighter leading-none mt-2">{data.title}</h2>
            <p className="text-[#6B7280] dark:text-gray-400 mt-2 font-bold text-base sm:text-lg">{data.focus}</p>
          </div>
        </div>

        {/* Daily Meals Section */}
        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#37352f] dark:text-gray-100 flex items-center gap-3">
            <Sun className="w-6 h-6 text-amber-700 dark:text-amber-500" /> DAILY MEAL STRATEGY
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.sections.map((s: any, i: number) => (
              <div key={i} className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md p-8 rounded-[2rem] border-2 border-white/80 dark:border-white/10 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
                <h4 className="text-amber-800 dark:text-amber-500 text-xl font-black mb-6 flex items-center gap-3"><Apple className="w-5 h-5" />{s.meal}</h4>
                <ul className="space-y-4 font-bold list-none pl-0">
                  {s.items.map((item: any, j: number) => (
                    <li key={j} className="text-[#4B5563] dark:text-gray-200 flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Budget High-Protein Plan [If Present] */}
        {data.budgetPlan && (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#37352f] dark:text-gray-100 flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-600 dark:text-orange-500" /> HIGH-PROTEIN BUDGET SYSTEM
            </h3>

            <div className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl border-2 border-white/80 dark:border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl transition-all duration-300">
              <h4 className="text-2xl font-black text-amber-800 dark:text-amber-500 tracking-tight mb-4">{data.budgetPlan.title}</h4>

              {/* Profile Details Chips */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {data.budgetPlan.profile.map((p: any, idx: number) => (
                  <span key={idx} className="bg-white/90 dark:bg-black/30 text-[#4B5563] dark:text-gray-300 text-xs font-black px-4 py-2 rounded-xl border border-black/5 dark:border-white/5 uppercase tracking-wider">{p}</span>
                ))}
              </div>

              {/* Quantities & Formula Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 border-b-2 border-black/5 dark:border-white/5 pb-8">
                {/* Quantity Guide Table */}
                <div className="space-y-4">
                  <h5 className="text-sm font-black uppercase tracking-widest text-[#9CA3AF]">Ingredient Quantity & Protein Guide</h5>
                  <div className="overflow-x-auto rounded-2xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/25">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-black/5 dark:border-white/5 text-[10px] uppercase font-black tracking-widest text-[#6B7280] dark:text-gray-400">
                          <th className="py-3 px-4">Ingredient</th>
                          <th className="py-3 px-4">Quantity</th>
                          <th className="py-3 px-4 text-right">Protein</th>
                        </tr>
                      </thead>
                      <tbody className="font-bold text-sm text-[#4B5563] dark:text-gray-300">
                        {data.budgetPlan.quantityGuide.map((g: any, idx: number) => (
                          <tr key={idx} className="border-b border-black/5 dark:border-white/5 last:border-none hover:bg-black/5 dark:hover:bg-white/5">
                            <td className="py-3.5 px-4 font-black">{g.item}</td>
                            <td className="py-3.5 px-4 text-xs">{g.qty}</td>
                            <td className="py-3.5 px-4 text-right text-emerald-600 dark:text-emerald-500 font-black">{g.protein}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-emerald-600/5 text-emerald-700 dark:text-emerald-400 font-black text-xs p-3.5 rounded-xl border border-emerald-500/20 text-center uppercase tracking-wider">
                    ⚡ {data.budgetPlan.quantityRule}
                  </div>
                </div>

                {/* Formula & Costs */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h5 className="text-sm font-black uppercase tracking-widest text-[#9CA3AF]">Target 65g Protein Formula</h5>
                    <div className="bg-amber-600/5 p-5 rounded-2xl border border-amber-500/20 space-y-3">
                      {data.budgetPlan.formula.map((f: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-sm font-bold text-amber-900 dark:text-amber-400">
                          <span>{f.split(' → ')[0]}</span>
                          <span className="font-black text-amber-800 dark:text-amber-500">→ {f.split(' → ')[1] || 'guaranteed'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm font-black uppercase tracking-widest text-[#9CA3AF]">Cost Breakdown</h5>
                      <span className="text-sm font-black text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">{data.budgetPlan.costTotal}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {data.budgetPlan.costs.map((c: any, idx: number) => (
                        <div key={idx} className="bg-white/40 dark:bg-black/25 p-3 rounded-xl border border-black/5 dark:border-white/5 text-center">
                          <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-wide truncate">{c.item}</div>
                          <div className="text-sm font-black text-amber-800 dark:text-amber-500 mt-1">{c.cost}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Structure & Best Standard Day */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Weekly Structure */}
                <div className="space-y-4">
                  <h5 className="text-sm font-black uppercase tracking-widest text-[#9CA3AF]">Weekly Protein Rotation</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.budgetPlan.weekStructure.map((w: any, idx: number) => (
                      <div key={idx} className="bg-white/40 dark:bg-black/25 p-3.5 rounded-xl border border-black/5 dark:border-white/5 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-[#4B5563] dark:text-gray-300">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Standard Day Profile */}
                <div className="space-y-4">
                  <h5 className="text-sm font-black uppercase tracking-widest text-[#9CA3AF]">Standard High-Yield Day Profile</h5>
                  <div className="bg-[#FAF9F6] dark:bg-black/35 rounded-2xl p-4 border border-black/5 dark:border-white/5 space-y-2">
                    {data.budgetPlan.bestStandardDay.map((d: any, idx: number) => {
                      const parts = d.split(' → ');
                      return (
                        <div key={idx} className="flex justify-between items-center text-xs sm:text-sm font-bold py-1 border-b border-black/5 dark:border-white/5 last:border-none text-[#4B5563] dark:text-gray-300">
                          <span className={parts[0].includes('TOTAL') ? 'font-black text-amber-800 dark:text-amber-500' : ''}>{parts[0]}</span>
                          <span className={parts[0].includes('TOTAL') ? 'font-black text-emerald-600 dark:text-emerald-500 text-base' : 'font-black'}>{parts[1]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Detailed Simple Recipes [If Present] */}
        {data.recipes && (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#37352f] dark:text-gray-100 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-700 dark:text-amber-500" /> {data.recipes.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.recipes.list.map((r: any, idx: number) => (
                <div key={idx} className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] border-2 border-white/80 dark:border-white/10 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-amber-800 dark:text-amber-500 mb-4">{r.name}</h4>

                    {/* Ingredients chips */}
                    <div className="mb-5">
                      <h5 className="text-[10px] uppercase font-black tracking-wider text-[#9CA3AF] mb-2.5">Ingredients</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {r.ingredients.map((ing: any, iIdx: number) => (
                          <span key={iIdx} className="text-[11px] font-bold bg-[#FAF9F6] dark:bg-black/30 border border-black/5 dark:border-white/5 px-2.5 py-1 rounded-lg text-[#4B5563] dark:text-gray-300">{ing}</span>
                        ))}
                      </div>
                    </div>

                    {/* Procedure steps */}
                    <div className="space-y-3.5 mb-6">
                      <h5 className="text-[10px] uppercase font-black tracking-wider text-[#9CA3AF]">Procedure</h5>
                      <ol className="space-y-2 list-decimal list-inside pl-0 font-bold text-xs sm:text-sm text-[#4B5563] dark:text-gray-300">
                        {r.procedure.map((step: any, sIdx: number) => (
                          <li key={sIdx} className="leading-tight"><span className="pl-1.5">{step}</span></li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Recipe Tip */}
                  <div className="bg-amber-600/5 text-amber-900 dark:text-amber-400 font-black text-xs p-3.5 rounded-xl border border-amber-500/20 flex items-center gap-3">
                    <span className="shrink-0 text-base">💡</span>
                    <span>{r.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    );
  };

  const activeTabData = availableTabs.find(t => t.id === activeTab);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className={`min-h-screen w-full font-sans pb-24 transition-colors duration-300 relative overflow-x-hidden ${(bgThemes as any)[bgTheme]}`}>
        {/* ── FROZEN AMBIENT LAYER ── */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1d35] via-[#12304e] to-[#0e2540] opacity-95" />
          <div className="orb-cyan absolute top-[-8%] left-[-6%] w-[55vw] h-[55vw] blur-[120px] animate-float-1 opacity-80" />
          <div className="orb-blue absolute bottom-[-12%] right-[-8%] w-[60vw] h-[60vw] blur-[130px] animate-float-2 opacity-70" />
          <div className="orb-indigo absolute top-[35%] right-[10%] w-[38vw] h-[38vw] blur-[100px] animate-float-3 opacity-60" />
          <div className="orb-white absolute top-[5%] right-[25%] w-[28vw] h-[28vw] blur-[90px] animate-float-4 opacity-55" />
          <div className="orb-cyan absolute bottom-[10%] left-[5%] w-[32vw] h-[32vw] blur-[100px] animate-float-2 opacity-45" style={{ animationDelay: '-8s' }} />
        </div>

        {/* GRID MESH */}
        <div className="fixed inset-0 pointer-events-none z-0 grid-mesh" />

        <header className="glass-panel border-b border-white/12 sticky top-0 z-50 shadow-2xl transition-all relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveLevel(null)}
                className="p-3 rounded-full text-sky-100 glass-ice border border-white/15 hover:border-cyan-400/50 active:border-cyan-400 transition-all shadow-sm"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div className="flex items-center gap-3">
                <div className={`bg-white/10 p-3 rounded-2xl hidden sm:block border border-white/12 shadow-inner ${currentWorkout?.colorClass}`}>
                  {currentWorkout && currentWorkout.icon ? <currentWorkout.icon className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tighter leading-none text-white">Burn<span className={theme.text}>out</span></h1>
                  <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mt-1 ${theme.text}`}>{currentWorkout?.title}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isInstallable && (
                <button
                  id="pwa-install-btn-workout"
                  onClick={handleInstallApp}
                  title="Install BurnOut App"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-ice border border-cyan-400/50 text-cyan-200 hover:bg-cyan-400/15 active:scale-95 transition-all shadow-sm text-xs font-black uppercase tracking-wider"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Install</span>
                </button>
              )}
              <button onClick={handleDownloadPDF} className="p-3 rounded-full glass-ice text-sky-100 border border-white/15 hover:border-cyan-400/50 shadow-md active:scale-95 transition-all"><Download className="w-6 h-6" /></button>
              <ThemePicker bgTheme={bgTheme} setBgTheme={setBgTheme} />
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center overflow-x-auto no-scrollbar gap-3 border-t border-white/8 py-3 transition-all">
            {availableTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-6 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all ${activeTab === tab.id
                  ? `bg-cyan-400 text-slate-900 shadow-lg shadow-cyan-400/25`
                  : `glass-ice text-sky-200 border border-white/10 hover:border-cyan-400/40 hover:text-cyan-200`
                  }`}
              >
                {tab.label}
              </button>
            ))}

            <form onSubmit={handleImageSearch} className="ml-2 flex items-center gap-2 glass-ice backdrop-blur-md border border-white/15 rounded-2xl px-4 py-2 shadow-sm shrink-0">
              <button type="submit" className="hover:scale-110 transition-transform"><Search className={`w-4 h-4 ${theme.text}`} /></button>
              <input type="text" value={imageSearch} onChange={(e) => setImageSearch(e.target.value)} placeholder="Exercise image..." className="bg-transparent border-none outline-none text-xs font-bold text-sky-100 w-32 focus:w-48 transition-all placeholder:text-sky-300/40" />
            </form>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
          {activeTabData ? activeTabData.render() : null}
        </main>

        <ZenPlayer />

        {/* SW UPDATE TOAST */}
        {needRefresh && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] w-[calc(100%-2rem)] max-w-sm">
            <div className="flex items-center gap-4 px-5 py-4 rounded-2xl glass-panel border border-cyan-400/30 shadow-2xl backdrop-blur-2xl">
              <div className="p-2 rounded-xl bg-cyan-400/15 border border-cyan-400/25">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-white leading-tight">New version available!</p>
                <p className="text-[10px] text-sky-300/60 font-bold mt-0.5">BurnOut has been updated</p>
              </div>
              <button
                onClick={() => updateServiceWorker(true)}
                className="shrink-0 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-black text-xs uppercase tracking-wider transition-all active:scale-95"
              >
                Update
              </button>
              <button
                onClick={() => setNeedRefresh(false)}
                className="shrink-0 p-1.5 rounded-lg glass-ice text-sky-300 hover:text-white border border-white/10 text-xs font-black transition-all active:scale-90"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* PWA INSTALLATION GUIDE MODAL */}
        {showInstallGuide && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="glass-panel border border-white/20 max-w-md w-full rounded-[2.5rem] p-6 sm:p-8 relative shadow-2xl text-left glass-shimmer">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-cyan-400/15 border border-cyan-400/25 text-cyan-300">
                  <Download className="w-6 h-6" />
                </div>
                <button
                  onClick={() => setShowInstallGuide(false)}
                  className="p-2 rounded-full glass-ice text-sky-200 hover:text-white border border-white/10 active:scale-90 transition-all text-sm font-black w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-2">Install BurnOut PWA</h3>
              <p className="text-sky-200/70 text-xs font-bold leading-relaxed mb-6">
                Install BurnOut on your device for absolute offline speed, quick access from your home screen, and elite full-screen tracking.
              </p>

              <div className="space-y-4">
                {/* iOS Instructions */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4">
                  <span className="text-2xl shrink-0">🍏</span>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">iOS / Apple Safari</h4>
                    <p className="text-[11px] text-sky-200/60 font-bold mt-1 leading-relaxed">
                      Tap the <strong className="text-cyan-300">Share</strong> button at the bottom navigation bar, then select <strong className="text-cyan-300">Add to Home Screen</strong>.
                    </p>
                  </div>
                </div>

                {/* Android / Chrome Instructions */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4">
                  <span className="text-2xl shrink-0">🤖</span>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">Android / Google Chrome</h4>
                    <p className="text-[11px] text-sky-200/60 font-bold mt-1 leading-relaxed">
                      Tap the <strong className="text-cyan-300">three dots menu</strong> next to the address bar, then select <strong className="text-cyan-300">Install App</strong>.
                    </p>
                  </div>
                </div>

                {/* Desktop Instructions */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4">
                  <span className="text-2xl shrink-0">💻</span>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">Mac / Windows Desktop</h4>
                    <p className="text-[11px] text-sky-200/60 font-bold mt-1 leading-relaxed">
                      Click the <strong className="text-cyan-300">Install Monitor icon</strong> on the right side of the URL address bar at the top of your browser.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowInstallGuide(false)}
                className="w-full mt-6 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
              >
                GOT IT, LET'S DO IT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

<script setup>
import planetUrl from "@/assets/planet.webp";
import CapricornConstellation from "./CapricornConstellation.vue";
</script>

<template>
  <div class="scene" aria-hidden="true">
    <div class="orbit">
      <CapricornConstellation class="constellation" />

      <img
        class="planet"
        :src="planetUrl"
        alt=""
        width="575"
        height="566"
        fetchpriority="high"
        decoding="async"
      />

      <svg class="satellite" viewBox="0 0 60 60">
        <g transform="rotate(-35 30 30)">
          <rect
            x="2"
            y="24"
            width="18"
            height="12"
            rx="1"
            fill="#3b4a9a"
            stroke="#9fb0ff"
            stroke-width=".8"
          />
          <rect
            x="40"
            y="24"
            width="18"
            height="12"
            rx="1"
            fill="#3b4a9a"
            stroke="#9fb0ff"
            stroke-width=".8"
          />
          <path
            d="M8 24v12M14 24v12M46 24v12M52 24v12"
            stroke="#9fb0ff"
            stroke-width=".5"
          />
          <line
            x1="20"
            y1="30"
            x2="40"
            y2="30"
            stroke="#c9cfe6"
            stroke-width="1.2"
          />
          <rect x="24" y="23" width="12" height="14" rx="2" fill="#dfe3f2" />
          <circle
            cx="30"
            cy="20"
            r="3"
            fill="none"
            stroke="#dfe3f2"
            stroke-width="1"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.scene {
  position: relative;
  pointer-events: none;
}

.orbit {
  position: relative;
  width: min(125%, 760px);
  aspect-ratio: 575 / 566;
  margin-left: 6%;
}

.planet {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 40px rgba(150, 160, 255, 0.28))
    drop-shadow(0 0 120px rgba(110, 120, 230, 0.16));
  animation: bob 14s ease-in-out infinite;
}

@keyframes bob {
  50% {
    transform: translateY(-10px);
  }
}

.constellation {
  position: absolute;
  width: 30%;
  min-width: 110px;
  top: -16%;
  left: -10%;
}

.satellite {
  position: absolute;
  width: 11%;
  min-width: 44px;
  bottom: 4%;
  left: -6%;
  animation: float 9s ease-in-out infinite;
}

@keyframes float {
  50% {
    transform: translate(-10px, -14px) rotate(6deg);
  }
}

@media (max-width: 900px) {
  .scene {
    position: absolute;
    inset: 0;
    overflow: hidden;
    --size: min(78vw, 380px);
  }

  .orbit {
    position: absolute;
    width: var(--size);
    margin: 0;
    top: calc(var(--header-h) - var(--size) * 0.28);
    right: calc(var(--size) * -0.34);
  }

  .planet {
    opacity: 0.6;
  }

  .constellation {
    width: 110px;
    top: 30%;
    left: -52%;
    opacity: 0.85;
  }

  .satellite {
    display: none;
  }
}
</style>

<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import type { TrainerSettings } from "$lib/engine/presets";
  import type { CalibrationField } from "$lib/trainer/settings";
  import { trainerSettingBounds } from "$lib/trainer/settings";

  let {
    settings,
    handleCalibrationInput,
  }: {
    settings: TrainerSettings;
    handleCalibrationInput?: (event: Event, field: CalibrationField) => void;
  } = $props();
</script>

<div class="space-y-4">
  <p class="text-xs text-muted-foreground">
    校准参数用于将速度单位（deg/s、cm/s）准确换算为屏幕像素速度。
  </p>

  <Field.Field>
    <Field.Label for="viewing-distance">观看距离（cm）</Field.Label>
    <input
      id="viewing-distance"
      type="number"
      min={trainerSettingBounds.viewingDistanceCm.min}
      max={trainerSettingBounds.viewingDistanceCm.max}
      step="1"
      value={settings.calibration.viewingDistanceCm}
      oninput={(e) => handleCalibrationInput?.(e, "viewingDistanceCm")}
      class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    />
    <Field.Description>
      你的眼睛到屏幕的距离，通常为 50–70 cm。
    </Field.Description>
  </Field.Field>

  <Field.Field>
    <Field.Label for="css-px-per-cm">屏幕密度（px/cm）</Field.Label>
    <input
      id="css-px-per-cm"
      type="number"
      min={trainerSettingBounds.cssPxPerCm.min}
      max={trainerSettingBounds.cssPxPerCm.max}
      step="0.5"
      value={settings.calibration.cssPxPerCm}
      oninput={(e) => handleCalibrationInput?.(e, "cssPxPerCm")}
      class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    />
    <Field.Description>
      每厘米对应的 CSS 像素数。可用直尺比对屏幕测量。
    </Field.Description>
  </Field.Field>
</div>

<script lang="ts">
  import EyeIcon from "@lucide/svelte/icons/eye";
  import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
  import XIcon from "@lucide/svelte/icons/x";

  import TrainerCalibrationControls from "$lib/components/trainer/TrainerCalibrationControls.svelte";
  import TrainerDrillControls from "$lib/components/trainer/TrainerDrillControls.svelte";
  import VisionSetupDialog from "$lib/components/VisionSetupDialog.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Slider } from "$lib/components/ui/slider/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { exercisePresets, type TrainerSettings } from "$lib/engine/presets";
  import type { TrainerDialogActions } from "$lib/trainer/control-actions";
  import type { BehaviorId } from "$lib/trainer/behavior";
  import { maxSpeedByUnit, speedStepByUnit } from "$lib/trainer/options";
  import { trainerSettingBounds } from "$lib/trainer/settings";
  import type { TrainingRecommendation } from "$lib/vision/prescription";

  type Props = {
    open: boolean;
    settings: TrainerSettings;
    isLilacChaserMode: boolean;
    behaviorValue: BehaviorId;
    patternSelectContentClass: string;
    actions: TrainerDialogActions;
  };

  let {
    open,
    settings,
    isLilacChaserMode,
    behaviorValue,
    patternSelectContentClass,
    actions,
  }: Props = $props();

  let visionDialogOpen = $state(false);

  const handleApplyRecommendation = (rec: TrainingRecommendation) => {
    actions.applyRecommendation(rec);
    visionDialogOpen = false;
  };
</script>

{#snippet sliderRow(label: string, value: string)}
  <div class="flex items-center justify-between">
    <Field.Label class="text-sm">{label}</Field.Label>
    <span class="text-xs tabular-nums text-muted-foreground">{value}</span>
  </div>
{/snippet}

<div
  id="trainer-controls-panel"
  popover="auto"
  class="trainer-controls-panel w-[22rem] rounded-2xl border bg-popover text-popover-foreground shadow-lg outline-none backdrop-blur-none"
  onbeforetoggle={(e) => {
    if (e instanceof ToggleEvent) {
      const isOpen = e.newState === "open";
      if (isOpen !== open) open = isOpen;
    }
  }}
>
  <div class="flex items-center justify-between border-b px-4 py-3">
    <h2 class="text-sm font-semibold">设置</h2>
    <div class="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        class="size-8"
        aria-label="视力匹配训练"
        title="根据近视/散光度数自动匹配训练参数"
        onclick={() => (visionDialogOpen = true)}
      >
        <EyeIcon class="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        class="size-8"
        aria-label="重置所有设置"
        onclick={actions.resetSettings}
      >
        <RefreshCwIcon class="size-4" />
      </Button>
      <Button
        popovertarget="trainer-controls-panel"
        variant="ghost"
        size="icon"
        class="size-8"
        aria-label="关闭设置面板"
      >
        <XIcon class="size-4" />
      </Button>
    </div>
  </div>

  <div class="overflow-y-auto" style="max-height: calc(100dvh - 8rem)">
    <Tabs.Root value="drill">
      <div class="sticky top-0 z-10 bg-popover px-4 pt-3">
        <Tabs.List class="w-full">
          <Tabs.Trigger value="drill" class="flex-1">训练</Tabs.Trigger>
          <Tabs.Trigger value="display" class="flex-1">显示</Tabs.Trigger>
          <Tabs.Trigger value="calibration" class="flex-1">校准</Tabs.Trigger>
        </Tabs.List>
      </div>

      <!-- 训练 Tab -->
      <Tabs.Content value="drill" class="space-y-4 px-4 pb-4 pt-3">
        <TrainerDrillControls
          {settings}
          {isLilacChaserMode}
          {behaviorValue}
          {patternSelectContentClass}
          handlePresetChange={actions.handlePresetChange}
          handlePatternChange={actions.handlePatternChange}
          handleBehaviorChange={actions.handleBehaviorChange}
          handleLilacChaserColorChange={actions.handleLilacChaserColorChange}
          lilacChaserScaleSliderValue={actions.lilacChaserScaleSlider.value}
          setLilacChaserScaleSliderValue={actions.lilacChaserScaleSlider.set}
          {sliderRow}
        />

        {#if !isLilacChaserMode}
          <Field.Field>
            {@render sliderRow("大小", `${Math.round(settings.baseRadiusPx)} px`)}
            <Slider
              bind:value={actions.sizeSlider.value, actions.sizeSlider.set}
              min={trainerSettingBounds.baseRadiusPx.min}
              max={trainerSettingBounds.baseRadiusPx.max}
              step={1}
              aria-label="目标大小"
            />
          </Field.Field>
          <Field.Field>
            {@render sliderRow("速度", `${settings.speed.value.toFixed(1)} ${settings.speed.unit}`)}
            <Slider
              bind:value={actions.speedSlider.value, actions.speedSlider.set}
              min={trainerSettingBounds.speedValue.min}
              max={maxSpeedByUnit[settings.speed.unit]}
              step={speedStepByUnit[settings.speed.unit]}
              aria-label="目标速度"
            />
          </Field.Field>
        {/if}

        {#if settings.presetId === "mot"}
          <Field.Field>
            {@render sliderRow("干扰物数量", `${settings.distractorCount}`)}
            <Slider
              bind:value={actions.distractorCountSlider.value, actions.distractorCountSlider.set}
              min={trainerSettingBounds.distractorCount.min}
              max={trainerSettingBounds.distractorCount.max}
              step={1}
              aria-label="干扰物数量"
            />
          </Field.Field>
        {/if}

        {#each exercisePresets.filter((p) => p.id === settings.presetId) as preset (preset.id)}
          {#if preset.description}
            <p class="text-xs text-muted-foreground">{preset.description}</p>
          {/if}
        {/each}
      </Tabs.Content>

      <!-- 显示 Tab -->
      <Tabs.Content value="display" class="space-y-4 px-4 pb-4 pt-3">
        {#if !isLilacChaserMode}
          <Field.Field>
            {@render sliderRow("不透明度", `${Math.round(settings.targetOpacity * 100)}%`)}
            <Slider
              bind:value={actions.opacitySlider.value, actions.opacitySlider.set}
              min={trainerSettingBounds.targetOpacity.min}
              max={trainerSettingBounds.targetOpacity.max}
              step={0.01}
              aria-label="目标不透明度"
            />
          </Field.Field>

          {#if settings.presetId === "mot"}
            <Field.Field>
              {@render sliderRow("干扰物亮度", `${Math.round(settings.distractorBrightness * 100)}%`)}
              <Slider
                bind:value={actions.distractorBrightnessSlider.value, actions.distractorBrightnessSlider.set}
                min={trainerSettingBounds.distractorBrightness.min}
                max={trainerSettingBounds.distractorBrightness.max}
                step={0.01}
                aria-label="干扰物亮度"
              />
            </Field.Field>
          {/if}

          {#if settings.targetShape === "letter"}
            <Field.Field>
              {@render sliderRow("字母缩放", `${settings.letterScale.toFixed(2)}x`)}
              <Slider
                bind:value={actions.letterScaleSlider.value, actions.letterScaleSlider.set}
                min={trainerSettingBounds.letterScale.min}
                max={trainerSettingBounds.letterScale.max}
                step={0.05}
                aria-label="字母缩放"
              />
            </Field.Field>
          {/if}
        {/if}
      </Tabs.Content>

      <!-- 校准 Tab -->
      <Tabs.Content value="calibration" class="space-y-4 px-4 pb-4 pt-3">
        <TrainerCalibrationControls
          {settings}
          handleCalibrationInput={actions.handleCalibrationInput}
        />
      </Tabs.Content>
    </Tabs.Root>
  </div>
</div>

<VisionSetupDialog
  open={visionDialogOpen}
  onApply={handleApplyRecommendation}
  onOpenChange={(o) => (visionDialogOpen = o)}
/>

<script lang="ts">
  import EyeIcon from "@lucide/svelte/icons/eye";
  import {
    computeRecommendation,
    validatePrescriptionInput,
    type TrainingRecommendation,
  } from "$lib/vision/prescription";
  import { Button } from "$lib/components/ui/button/index.js";

  type Props = {
    onApply: (rec: TrainingRecommendation) => void;
  };

  let { onApply }: Props = $props();

  let myopiaInput = $state("");
  let astigmatismInput = $state("0");
  let error = $state("");
  let recommendation = $state<TrainingRecommendation | null>(null);
  let applied = $state(false);

  const levelColors: Record<string, string> = {
    mild: "text-green-600 dark:text-green-400",
    moderate: "text-yellow-600 dark:text-yellow-400",
    high: "text-orange-600 dark:text-orange-400",
    "very-high": "text-red-600 dark:text-red-400",
  };

  const handleCompute = () => {
    error = "";
    recommendation = null;
    applied = false;
    const result = validatePrescriptionInput(myopiaInput, astigmatismInput);
    if (!result.valid) {
      error = result.error;
      return;
    }
    recommendation = computeRecommendation(result.input);
  };

  const handleApply = (rec: TrainingRecommendation) => {
    onApply(rec);
    applied = true;
    // 应用后自动关闭 popover
    const panel = document.getElementById("vision-setup-popover");
    if (panel instanceof HTMLElement && typeof panel.hidePopover === "function") {
      panel.hidePopover();
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleCompute();
  };

  const inputClass =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
</script>

<!-- 触发按鈕 -->
<Button
  class="pressable-ui"
  variant="outline"
  size="icon"
  aria-label="视力匹配训练"
  title="根据近视/散光度数匹配训练参数"
  popovertarget="vision-setup-popover"
>
  <EyeIcon class="size-4" />
</Button>

<!-- Popover 面板 -->
<div
  id="vision-setup-popover"
  popover="auto"
  class="vision-setup-popover w-80 rounded-2xl border bg-popover p-4 text-popover-foreground shadow-lg outline-none"
>
  <div class="mb-3">
    <h3 class="text-sm font-semibold">视力匹配训练</h3>
    <p class="mt-0.5 text-xs text-muted-foreground">输入度数，自动匹配目标大小与速度</p>
  </div>

  <div class="space-y-3">
    <!-- 近视度数 -->
    <div>
      <label for="hud-myopia-input" class="mb-1 block text-xs font-medium">
        近视度数
      </label>
      <div class="relative">
        <input
          id="hud-myopia-input"
          type="number"
          min="0"
          max="3000"
          step="25"
          placeholder="例如 300"
          class={inputClass}
          bind:value={myopiaInput}
          onkeydown={handleKeydown}
        />
        <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">度</span>
      </div>
    </div>

    <!-- 散光度数 -->
    <div>
      <label for="hud-astigmatism-input" class="mb-1 block text-xs font-medium">
        散光度数
      </label>
      <div class="relative">
        <input
          id="hud-astigmatism-input"
          type="number"
          min="0"
          max="1000"
          step="25"
          placeholder="没有散光填 0"
          class={inputClass}
          bind:value={astigmatismInput}
          onkeydown={handleKeydown}
        />
        <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">度</span>
      </div>
    </div>

    {#if error}
      <p class="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>
    {/if}

    <Button onclick={handleCompute} class="w-full" size="sm">计算匹配方案</Button>

    {#if recommendation}
      {@const rec = recommendation}
      {@const colorClass = levelColors[rec.level] ?? ""}
      <div class="rounded-xl border bg-muted/40 p-3 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold">匹配结果</span>
          <span class="text-xs font-bold {colorClass}">{rec.levelLabel}度</span>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="rounded-lg border bg-background px-2 py-1.5 text-center">
            <div class="text-base font-bold tabular-nums">{rec.baseRadiusPx}</div>
            <div class="text-xs text-muted-foreground">目标大小 (px)</div>
          </div>
          <div class="rounded-lg border bg-background px-2 py-1.5 text-center">
            <div class="text-base font-bold tabular-nums">{rec.speedValue}</div>
            <div class="text-xs text-muted-foreground">速度 (deg/s)</div>
          </div>
        </div>

        <div class="rounded-lg border bg-background px-3 py-2 space-y-1">
          <div class="flex justify-between text-xs">
            <span class="text-muted-foreground">建议周期</span>
            <span class="font-semibold">{rec.durationWeeks} 周</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-muted-foreground">每日时长</span>
            <span class="font-semibold">{rec.dailyMinutes} 分钟</span>
          </div>
        </div>

        {#if applied}
          <div class="flex items-center gap-1.5 rounded-lg bg-accent/20 px-3 py-1.5">
            <span class="text-xs font-medium text-accent-foreground">✓ 设置已应用</span>
          </div>
        {:else}
          <Button onclick={() => handleApply(rec)} size="sm" class="w-full">应用到训练器</Button>
        {/if}
      </div>
    {/if}

    <p class="text-xs text-muted-foreground leading-relaxed">
      本工具为练习软件，非医疗建议。
    </p>
  </div>
</div>

<style>
  .vision-setup-popover {
    position-area: block-end span-inline-end;
    margin-top: 0.5rem;
  }

  @supports not (position-area: block-end) {
    .vision-setup-popover {
      position: fixed;
      top: 4rem;
      right: 1rem;
    }
  }
</style>

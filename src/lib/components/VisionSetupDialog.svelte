<script lang="ts">
  import {
    computeRecommendation,
    validatePrescriptionInput,
    type TrainingRecommendation,
  } from "$lib/vision/prescription";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Field from "$lib/components/ui/field/index.js";

  type Props = {
    open: boolean;
    onApply: (rec: TrainingRecommendation) => void;
    onOpenChange: (open: boolean) => void;
  };

  let { open, onApply, onOpenChange }: Props = $props();

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

  const handleApply = () => {
    if (!recommendation) return;
    onApply(recommendation);
    applied = true;
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleCompute();
  };
</script>

<Dialog.Root {open} {onOpenChange}>
  <Dialog.Content class="max-w-md">
    <Dialog.Header>
      <Dialog.Title>视力匹配训练</Dialog.Title>
      <Dialog.Description>
        输入你的度数，自动匹配合适的目标大小与速度，并建议训练周期。
      </Dialog.Description>
    </Dialog.Header>

    <div class="grid gap-4 py-2">
      <Field.Field>
        <Field.Label for="myopia-input">近视度数（度）</Field.Label>
        <div class="relative">
          <input
            id="myopia-input"
            type="number"
            min="0"
            max="3000"
            step="25"
            placeholder="例如 300"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            bind:value={myopiaInput}
            onkeydown={handleKeydown}
          />
          <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">度</span>
        </div>
        <Field.Description>示例：近视 300 度填写 300；暂不考虑远视填 0</Field.Description>
      </Field.Field>

      <Field.Field>
        <Field.Label for="astigmatism-input">散光度数（度）</Field.Label>
        <div class="relative">
          <input
            id="astigmatism-input"
            type="number"
            min="0"
            max="1000"
            step="25"
            placeholder="没有散光填 0"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            bind:value={astigmatismInput}
            onkeydown={handleKeydown}
          />
          <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">度</span>
        </div>
        <Field.Description>示例：散光 75 度填写 75；无散光填 0</Field.Description>
      </Field.Field>

      {#if error}
        <p class="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      {/if}

      <Button onclick={handleCompute} class="w-full">计算匹配方案</Button>

      {#if recommendation}
        {@const rec = recommendation}
        {@const colorClass = levelColors[rec.level] ?? ""}
        <div class="rounded-xl border bg-muted/40 p-4 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold">匹配结果</span>
            <span class="text-sm font-bold {colorClass}">{rec.levelLabel}度</span>
          </div>

          <p class="text-xs text-muted-foreground leading-relaxed">{rec.levelDescription}</p>

          <div class="grid grid-cols-2 gap-2">
            <div class="rounded-lg border bg-background px-3 py-2 text-center">
              <div class="text-xl font-bold tabular-nums">{rec.baseRadiusPx}</div>
              <div class="text-xs text-muted-foreground mt-0.5">目标大小 (px)</div>
            </div>
            <div class="rounded-lg border bg-background px-3 py-2 text-center">
              <div class="text-xl font-bold tabular-nums">{rec.speedValue}</div>
              <div class="text-xs text-muted-foreground mt-0.5">速度 (deg/s)</div>
            </div>
          </div>

          <div class="rounded-lg border bg-background px-3 py-2 space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">建议周期</span>
              <span class="font-semibold">{rec.durationWeeks} 周</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">每日时长</span>
              <span class="font-semibold">{rec.dailyMinutes} 分钟</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">总训练时长</span>
              <span class="font-semibold">{rec.durationWeeks * 7 * rec.dailyMinutes} 分钟</span>
            </div>
          </div>

          <p class="text-xs text-muted-foreground leading-relaxed">{rec.cycleDescription}</p>

          {#if applied}
            <div class="flex items-center gap-2 rounded-lg bg-accent/20 px-3 py-2">
              <span class="text-sm text-accent-foreground font-medium">✓ 设置已应用</span>
              <span class="text-xs text-muted-foreground">可直接开始训练</span>
            </div>
          {:else}
            <Button onclick={handleApply} variant="default" class="w-full">应用到训练器</Button>
          {/if}
        </div>
      {/if}
    </div>

    <p class="text-xs text-muted-foreground border-t pt-3 leading-relaxed">
      本工具为练习软件，非医疗建议。度数匹配仅作参考，如有眼部不适请停止训练并就医。
    </p>
  </Dialog.Content>
</Dialog.Root>

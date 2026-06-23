<script lang="ts">
  import { onDestroy } from "svelte";
  import type { SessionModule } from "$lib/vision/prescription";
  import { Button } from "$lib/components/ui/button/index.js";

  type Props = {
    modules: SessionModule[];
    onModuleStart: (module: SessionModule) => void;
    onSessionComplete: () => void;
    onDismiss: () => void;
  };

  let { modules, onModuleStart, onSessionComplete, onDismiss }: Props = $props();

  type Phase = "preview" | "running" | "between" | "done";

  let phase = $state<Phase>("preview");
  let currentIndex = $state(0);
  let remainingSec = $state(120);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const currentModule = $derived(modules[currentIndex]);
  const isLast = $derived(currentIndex === modules.length - 1);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const clearTimer = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    remainingSec = 120;
    intervalId = setInterval(() => {
      remainingSec -= 1;
      if (remainingSec <= 0) {
        clearTimer();
        if (isLast) {
          phase = "done";
          onSessionComplete();
        } else {
          phase = "between";
        }
      }
    }, 1000);
  };

  const startCurrentModule = () => {
    phase = "running";
    onModuleStart(currentModule);
    startTimer();
  };

  const nextModule = () => {
    currentIndex += 1;
    startCurrentModule();
  };

  const handleDismiss = () => {
    clearTimer();
    onDismiss();
  };

  onDestroy(() => clearTimer());

  // 进度百分比
  const progressPct = $derived(
    phase === "running" ? ((120 - remainingSec) / 120) * 100 : 0
  );
</script>

<!-- 半透明遮罩层，只占屏幕下半部分避免途屏，坐落底部 -->
<div
  class="pointer-events-none fixed inset-0 z-40 flex flex-col items-center justify-end pb-10"
  aria-live="polite"
>
  <div class="pointer-events-auto w-full max-w-sm rounded-2xl border bg-popover/95 p-5 shadow-2xl backdrop-blur-md mx-4">

    {#if phase === "preview"}
      <!-- 训练计划预览 -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold">今日训练计划</h3>
          <button
            class="text-xs text-muted-foreground hover:text-foreground"
            onclick={handleDismiss}
            aria-label="关闭"
          >×</button>
        </div>
        <p class="text-xs text-muted-foreground">
          共 {modules.length} 组训练，每组 2 分钟，合计 {modules.length * 2} 分钟
        </p>
        <div class="space-y-1">
          {#each modules as mod (mod.index)}
            <div class="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-1.5">
              <span class="text-xs font-medium">{mod.label} · {mod.focusLabel}</span>
              <span class="text-xs text-muted-foreground tabular-nums">大小 {mod.baseRadiusPx}px · {mod.speedValue} deg/s</span>
            </div>
          {/each}
        </div>
        <Button onclick={startCurrentModule} class="w-full" size="sm">开始训练</Button>
      </div>

    {:else if phase === "running"}
      <!-- 训练中：倒计时 -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted-foreground">{currentModule.label} / 共 {modules.length} 组</span>
          <span class="text-xs text-muted-foreground">{currentModule.focusLabel}</span>
        </div>

        <!-- 倒计时显示 -->
        <div class="flex flex-col items-center gap-1">
          <span class="text-4xl font-bold tabular-nums tracking-tight">
            {formatTime(remainingSec)}
          </span>
          <span class="text-xs text-muted-foreground">剩余时间</span>
        </div>

        <!-- 进度条 -->
        <div class="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            class="h-full rounded-full bg-accent transition-all duration-1000 ease-linear"
            style="width: {progressPct}%"
          ></div>
        </div>

        <!-- 模块小圆点 -->
        <div class="flex justify-center gap-1.5">
          {#each modules as mod (mod.index)}
            <div
              class="size-2 rounded-full transition-colors {mod.index - 1 === currentIndex
                ? 'bg-accent'
                : mod.index - 1 < currentIndex
                  ? 'bg-accent/40'
                  : 'bg-muted'}"
            ></div>
          {/each}
        </div>

        <button
          class="w-full text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
          onclick={handleDismiss}
        >退出训练</button>
      </div>

    {:else if phase === "between"}
      <!-- 组间休息 -->
      <div class="space-y-3">
        <div class="text-center space-y-1">
          <div class="text-2xl">✅</div>
          <h3 class="text-sm font-semibold">{currentModule.label}完成！</h3>
          <p class="text-xs text-muted-foreground">
            已完成 {currentIndex + 1} / {modules.length} 组，准备好就继续。
          </p>
        </div>
        <div class="rounded-lg border bg-muted/40 px-3 py-2">
          <p class="text-xs font-medium">下一组：{modules[currentIndex + 1].label}</p>
          <p class="text-xs text-muted-foreground">{modules[currentIndex + 1].focusLabel} · 大小 {modules[currentIndex + 1].baseRadiusPx}px · {modules[currentIndex + 1].speedValue} deg/s</p>
        </div>
        <Button onclick={nextModule} class="w-full" size="sm">开始下一组</Button>
        <button
          class="w-full text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
          onclick={handleDismiss}
        >退出训练</button>
      </div>

    {:else if phase === "done"}
      <!-- 全部完成 -->
      <div class="space-y-3 text-center">
        <div class="text-3xl">🎉</div>
        <h3 class="text-sm font-semibold">今日训练完成！</h3>
        <p class="text-xs text-muted-foreground">
          共完成 {modules.length} 组训练，合计 {modules.length * 2} 分钟。明天再接着练！
        </p>
        <Button onclick={handleDismiss} class="w-full" size="sm" variant="outline">关闭</Button>
      </div>
    {/if}

  </div>
</div>

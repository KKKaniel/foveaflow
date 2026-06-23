<script lang="ts">
  import { onDestroy } from "svelte";
  import PlayIcon from "@lucide/svelte/icons/play";
  import CheckIcon from "@lucide/svelte/icons/check";
  import type { DailySession, SessionModule } from "$lib/vision/prescription";
  import type { TrainingSessionState } from "$lib/trainer/control-actions";
  import { Button } from "$lib/components/ui/button/index.js";

  type Props = {
    sessionState: TrainingSessionState;
    onStartModule: (moduleIndex: number) => void;
    onModuleTick: (remainingSec: number) => void;
    onModuleDone: () => void;
    onNextModule: () => void;
    onSessionDone: () => void;
    onDismiss: () => void;
  };

  let {
    sessionState,
    onStartModule,
    onModuleTick,
    onModuleDone,
    onNextModule,
    onSessionDone,
    onDismiss,
  }: Props = $props();

  let tickInterval: ReturnType<typeof setInterval> | null = null;

  const clearTick = () => {
    if (tickInterval !== null) {
      clearInterval(tickInterval);
      tickInterval = null;
    }
  };

  const startTick = () => {
    clearTick();
    tickInterval = setInterval(() => {
      if (sessionState.status !== "running") {
        clearTick();
        return;
      }
      const next = sessionState.remainingSec - 1;
      if (next <= 0) {
        clearTick();
        onModuleDone();
      } else {
        onModuleTick(next);
      }
    }, 1000);
  };

  $effect(() => {
    if (sessionState.status === "running") {
      startTick();
    } else {
      clearTick();
    }
  });

  onDestroy(clearTick);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const progressPercent = $derived(() => {
    if (sessionState.status !== "running") return 0;
    const total = 120;
    return Math.round(((total - sessionState.remainingSec) / total) * 100);
  });

  const currentModule = $derived((): SessionModule | null => {
    if (
      sessionState.status === "running" ||
      sessionState.status === "module-done"
    ) {
      return sessionState.session.modules[sessionState.moduleIndex] ?? null;
    }
    return null;
  });

  const isLastModule = $derived(() => {
    if (
      sessionState.status === "running" ||
      sessionState.status === "module-done"
    ) {
      return (
        sessionState.moduleIndex >=
        sessionState.session.modules.length - 1
      );
    }
    return false;
  });
</script>

{#if sessionState.status !== "idle"}
  <!-- 全屏遮罩（训练运行时显示在左下角） -->
  <div
    class="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    role="region"
    aria-label="训练计时"
  >
    {#if sessionState.status === "running"}
      {@const mod = currentModule()}
      <div
        class="pointer-events-auto flex flex-col items-center gap-2 rounded-2xl border bg-popover/95 px-6 py-4 shadow-xl backdrop-blur-md"
      >
        <!-- 模块标题 -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground">
            模块 {sessionState.moduleIndex + 1} / {sessionState.session.modules.length}
          </span>
          <span class="h-1 w-1 rounded-full bg-muted-foreground/40"></span>
          <span class="text-xs font-medium">{mod?.label ?? ""}</span>
        </div>

        <!-- 倒计时 -->
        <div
          class="font-mono text-5xl font-bold tabular-nums tracking-tight"
          aria-live="polite"
          aria-label={`剩余 ${formatTime(sessionState.remainingSec)}`}
        >
          {formatTime(sessionState.remainingSec)}
        </div>

        <!-- 进度条 -->
        <div class="h-1.5 w-48 overflow-hidden rounded-full bg-muted">
          <div
            class="h-full rounded-full bg-accent transition-all duration-1000"
            style="width: {progressPercent()}%"
          ></div>
        </div>

        <p class="max-w-[16rem] text-center text-xs text-muted-foreground">
          {mod?.description ?? ""}
        </p>
      </div>

    {:else if sessionState.status === "module-done"}
      {@const mod = currentModule()}
      <div
        class="pointer-events-auto flex flex-col items-center gap-3 rounded-2xl border bg-popover/95 px-6 py-5 shadow-xl backdrop-blur-md"
      >
        <div class="flex size-10 items-center justify-center rounded-full bg-accent/20">
          <CheckIcon class="size-5 text-accent-foreground" />
        </div>
        <div class="text-center">
          <p class="text-sm font-semibold">模块 {sessionState.moduleIndex + 1} 完成</p>
          <p class="mt-0.5 text-xs text-muted-foreground">{mod?.label ?? ""}</p>
        </div>

        {#if isLastModule()}
          <Button onclick={onSessionDone} class="w-full" size="sm">
            <CheckIcon class="mr-1.5 size-3.5" />
            今日训练完成
          </Button>
        {:else}
          <Button onclick={onNextModule} class="w-full" size="sm">
            <PlayIcon class="mr-1.5 size-3.5" />
            开始下一模块
          </Button>
        {/if}

        <button
          type="button"
          class="text-xs text-muted-foreground underline-offset-2 hover:underline"
          onclick={onDismiss}
        >
          退出训练
        </button>
      </div>

    {:else if sessionState.status === "session-done"}
      <div
        class="pointer-events-auto flex flex-col items-center gap-3 rounded-2xl border bg-popover/95 px-8 py-6 shadow-xl backdrop-blur-md"
      >
        <div class="flex size-12 items-center justify-center rounded-full bg-accent/20">
          <CheckIcon class="size-6 text-accent-foreground" />
        </div>
        <div class="text-center">
          <p class="text-base font-semibold">🎉 今日训练完成！</p>
          <p class="mt-1 text-xs text-muted-foreground">
            共完成 {sessionState.session.modules.length} 个模块，{sessionState.session.totalMinutes} 分钟
          </p>
        </div>
        <Button onclick={onDismiss} size="sm" class="w-full">关闭</Button>
      </div>
    {/if}
  </div>
{/if}

<script lang="ts">
  import PatternPathPreview from "$lib/components/PatternPathPreview.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import {
    predictivePatternOptions,
    unpredictivePatternOptions,
  } from "$lib/trainer/options";
</script>

<Select.Group>
  <Select.GroupHeading>非规律性</Select.GroupHeading>
  {#each unpredictivePatternOptions as option (option.id)}
    <Select.Item value={option.id}>
      <span class="flex min-w-0 items-center gap-2">
        <PatternPathPreview patternId={option.id} compact />
        <span class="truncate">{option.name}</span>
      </span>
    </Select.Item>
  {/each}
</Select.Group>
<Select.Group>
  <Select.GroupHeading>规律性</Select.GroupHeading>
  {#each predictivePatternOptions as option (option.id)}
    <Select.Item value={option.id}>
      <span class="flex min-w-0 items-center gap-2">
        <PatternPathPreview patternId={option.id} compact />
        <span class="truncate">{option.name}</span>
      </span>
    </Select.Item>
  {/each}
</Select.Group>

<script lang="ts">
  import { fillActiveTab } from "@modules/browser/shared/lib";
  import { useStorage } from "@shared/lib";
  import Button, { Label } from "@smui/button";
  import Textfield from "@smui/textfield";

  const [loadValue, setValue] = useStorage("hhhelper:content");

  let value = $state("");
  let clickCount = $state(0);
  let debugStatus = $state("");

  void loadValue().then((content) => {
    value = content;
  });

  const handleFill = async () => {
    clickCount += 1;
    debugStatus = `click #${clickCount}: running...`;
    const result = await fillActiveTab(value);
    debugStatus = `click #${clickCount}: ${result}`;
    void setValue(value);
  };
</script>

<main>
  <h1>HH Helper</h1>

  <footer class="actions">
    <Textfield
      bind:value
      textarea
      label="Текст"
      style="width: 100%;"
      input$rows={10}
    />

    <Button variant="raised" color="primary" style="width: 100%;" onclick={handleFill}>
      <Label>Заполнить</Label>
    </Button>

    <pre style="white-space: pre-wrap; font-size: 11px; margin: 0;">{debugStatus}</pre>
  </footer>
</main>

<style>
  main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 420px;
    padding: 16px;
  }

  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: auto;
    padding-top: 16px;
  }
</style>

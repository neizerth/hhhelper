<script lang="ts">
  import { fillActiveTab } from "@modules/browser/shared/lib";
  import { useStorage } from "@shared/lib";
  import Button, { Label } from "@smui/button";
  import Paper, { Content } from "@smui/paper";
  import Textfield from "@smui/textfield";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";

  const [loadValue, setValue] = useStorage("hhhelper:content");

  let value = $state("");

  void loadValue().then((content) => {
    value = content;
  });

  const handleFill = () => {
    void fillActiveTab(value);
    void setValue(value);
  };
</script>

<div class="app">
  <TopAppBar variant="static">
    <Row>
      <Section>
        <Title>HH Helper</Title>
      </Section>
    </Row>
  </TopAppBar>

  <Paper variant="unelevated" square>
    <Content>
      <div class="actions">
        <Textfield
          bind:value
          textarea
          label="Текст"
          fullwidth
          input$rows={10}
          variant="outlined"
        />

        <Button variant="raised" color="primary" style="width: 100%;" onclick={handleFill}>
          <Label>Заполнить</Label>
        </Button>
      </div>
    </Content>
  </Paper>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 420px;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    padding: 16px;
  }
</style>

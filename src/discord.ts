export type EmbedField = {
  name: string;
  value: string;
  inline?: boolean;
};

type Embed = {
  title: string;
  description: string;
  content: string;
  fields?: EmbedField[];
};

const executeWebhook = async (webhook: string, content: Embed): Promise<void> => {
  console.log(JSON.stringify(content));
  const response = await fetch(webhook, {
    method: "POST",
    body: JSON.stringify(content),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.debug(await response.json());
};

export const sendAlert = async (
  webhook: string,
  title: string,
  description: string,
  fields: EmbedField[],
): Promise<void> => {
  await executeWebhook(webhook, {
    title: title,
    description: description,
    content: description,
    fields: fields,
  });
};

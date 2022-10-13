export type EmbedField = {
  name: string;
  value: string;
  inline?: boolean;
};

type Embed = {
  title: string;
  description: string;
  fields?: EmbedField[];
};

type DiscordMessage = {
  /**
   * Text content displayed above any embeds.
   */
  content: string;
  embeds: Embed[];
};

/**
 * We send a POST request using fetch() as that is what is supported in Cloudflare workers.
 * npm packages for Discord webhooks don't seem to support fetch(), so we roll our own.
 *
 * @param webhook
 * @param content
 */
const executeWebhook = async (webhook: string, content: DiscordMessage): Promise<void> => {
  console.log(JSON.stringify(content));
  const response = await fetch(webhook, {
    method: "POST",
    body: JSON.stringify(content),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(await response.json());
};

export const sendAlert = async (
  webhook: string,
  title: string,
  description: string,
  fields: EmbedField[],
): Promise<void> => {
  await executeWebhook(webhook, {
    content: "",
    embeds: [
      {
        title: title,
        description: description,
        fields: fields,
      },
    ],
  });
};

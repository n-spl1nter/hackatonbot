import postback from '../data/postback';
import quickReply from '../data/quickReply';

export default async function messageProcess(webhookEvent, req, res) {
  if (webhookEvent.postback) {
    await postback(webhookEvent);
  } else if (webhookEvent.message && webhookEvent.message.quick_reply) {
    await quickReply(webhookEvent);
  }
}

export async function streamGradioEvent(eventId, onData, onEnd, onError) {
  try {
    const response = await fetch(
      `https://mohamedfathi80-word-after-before.hf.space/gradio_api/call/predict/${eventId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const textChunk = decoder.decode(value, { stream: true });
      onData(textChunk);
    }

    onEnd();
  } catch (error) {
    onError?.(error);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { codigo } = req.body;
  if (!codigo) {
    return res.status(400).json({ message: 'Código não fornecido.' });
  }

  const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

  try {
    const payload = {
      embeds: [{
        title: "🔑 Novo Código Recebido!",
        color: 8008703,
        fields: [{ name: "Conteúdo do Código:", value: `\`\`\`${codigo}\`\`\`` }],
        timestamp: new Date().toISOString()
      }]
    };

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return res.status(200).json({ status: 'sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
}

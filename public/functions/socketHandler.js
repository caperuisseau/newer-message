exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    if (!body.message || !body.nickname) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Requête invalide, message ou nickname manquant.' }),
      };
    }

    const { message, nickname } = body;

    // Logique pour traiter le message
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message reçu', data: { message, nickname } }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur de serveur.' }),
    };
  }
};

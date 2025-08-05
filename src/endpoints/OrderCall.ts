import { addDataAndFileToRequest, Endpoint } from 'payload';

type MetaItem = { key: string; value: string };
type typeOrderCall = {
  name?: string;
  email?: string;
  phone?: string;

};

export const OrderCall: Endpoint = {
  path: '/order-call',
  method: 'post',
  handler: async (req) => {

    const apiKey = req.headers.get('x-api-key')
    const apiSecret = req.headers.get('x-api-secret')


    if (
      apiKey !== process.env.API_KEY ||
      apiSecret !== process.env.API_SECRET
    ) {
      return Response.json({ error: 'Unauthorized: invalid API keys' }, { status: 403 })
    }


    await addDataAndFileToRequest(req);
    if (typeof req.json !== 'function') {
      return Response.json({ error: 'JSON parsing not supported' }, { status: 400 });
    }

    const body = await req.json() as typeOrderCall;
    console.log(body)

    const { name, email, phone} = body;

    if (!name) {
      return Response.json({ error: 'Поле "name" є обовʼязковим' }, { status: 400 });
    }

    if (!phone) {
      return Response.json({ error: 'Поле "phone" є обовʼязковим' }, { status: 400 });
    }
    if (!email) {
      return Response.json({ error: 'Поле "email" є обовʼязковим' }, { status: 400 });
    }


    // Перетворюємо name, email, phone у meta формат
    const metaFields: MetaItem[] = [
      { key: 'name', value: name },
      ...(email ? [{ key: 'email', value: email }] : []),
      { key: 'phone', value: phone },
    ];

    const newApp = await req.payload.create({
      collection: 'applications',
      data: {
        category:'686e43d5cf0cc7b525cf1993',
        meta: metaFields,
      },
      overrideAccess: true,
    });

    return Response.json({ success: true, data: newApp });
  },
};

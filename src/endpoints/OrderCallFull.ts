import { addDataAndFileToRequest, Endpoint } from 'payload';

type MetaItem = { key: string; value: string };
type typeOrderCall = {
  name: string;
  email: string;
  phone: string;
  country: string;
  employees: string;
  position: string;
  industry: string;
  stage: string;
  website: string;
  message: string;

};



export const OrderCallFull: Endpoint = {
  path: '/order-call-full',
  method: 'post',
  handler: async (req) => {

    // Отримуємо ключі з заголовків
    const apiKey = req.headers.get('x-api-key')
    const apiSecret = req.headers.get('x-api-secret')

    // Перевіряємо
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

    const { name,
      email,
      phone,

      country,
      employees,
      position,

      industry,
      stage,
      website,

      message} = body;

    // Список обов’язкових ключів
    const requiredFields: (keyof typeOrderCall)[] = [
      'name',
      'email',
      'phone',
      // 'country',
      // 'employees',
      // 'position',
      // 'industry',
      // 'stage',
      // 'website',
      // 'message',
    ];

    // Перевірка на відсутні значення
    for (const field of requiredFields) {
      if (!body[field]) {
        return Response.json({ error: `Поле "${field}" є обовʼязковим` }, { status: 400 });
      }
    }



    // Перетворюємо name, email, phone у meta формат
    const metaFields: MetaItem[] = [
      { key: 'name', value: name },
      { key: 'email', value: email },
      { key: 'phone', value: phone },

      { key: 'country', value: country },
      { key: 'employees', value: employees },
      { key: 'position', value: position },

      { key: 'industry', value: industry },
      { key: 'stage', value: stage },
      { key: 'website', value: website },

      { key: 'message', value: message },


    ];

    const newApp = await req.payload.create({
      collection: 'applications',
      data: {
        category:'686e4d39cf0cc7b525cf1caf',
        meta: metaFields,
      },
      overrideAccess: true,
    });

    return Response.json({ success: true, data: newApp });
  },
};

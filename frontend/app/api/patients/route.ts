import axios from 'axios';

const { API_BASE_URL } = process.env;

export async function GET() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/patients`);
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.response?.data || error.message },
      {
        status: error.response?.status || 500,
        statusText: error.response?.statusText || 'Internal server error',
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await axios.post(`${API_BASE_URL}/patients`, formData);
    return Response.json(
      { data: result.data },
      { status: result.status || 201 }
    );
  } catch (error) {
    return Response.json(
      error.response?.data
        ? { ...error.response?.data }
        : { errors: [{ message: error.message }] },
      {
        status: error.response?.status || 500,
        statusText: error.response?.statusText || 'Internal server error',
      }
    );
  }
}

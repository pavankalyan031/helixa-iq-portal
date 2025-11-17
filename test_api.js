const fetch = require('node-fetch');

const testEndpoint = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/premium/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123',
        firstName: 'Test',
        lastName: 'User'
      })
    });

    const data = await response.json();
    console.log('Response:', data);
    console.log('Status:', response.status);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testEndpoint();
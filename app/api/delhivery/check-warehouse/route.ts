import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiToken = process.env.DELHIVERY_API_TOKEN;
    const baseUrl = process.env.DELHIVERY_ENVIRONMENT === 'production'
      ? 'https://track.delhivery.com'
      : 'https://staging-express.delhivery.com';

    if (!apiToken) {
      return NextResponse.json({
        success: false,
        error: 'DELHIVERY_API_TOKEN not configured',
        message: 'Please set DELHIVERY_API_TOKEN in environment variables'
      }, { status: 400 });
    }

    // Try to fetch warehouse details
    const response = await fetch(
      `${baseUrl}/api/backend/clientwarehouse/`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const responseText = await response.text();
    console.log('Warehouse check raw response:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', e);
      
      // Check if it's an error message from Delhivery
      if (responseText.includes('error') || responseText.includes('Error')) {
        return NextResponse.json({
          success: false,
          error: 'Delhivery API Error',
          message: responseText,
          suggestion: 'This usually means: 1) Invalid API token, 2) API token lacks permissions, or 3) Warehouse not registered',
          nextSteps: [
            'Verify DELHIVERY_API_TOKEN in .env is correct',
            'Check that the token has warehouse management permissions',
            'Log in to Delhivery dashboard and verify warehouse is registered',
            'Ensure warehouse has working days configured'
          ]
        }, { status: 400 });
      }
      
      return NextResponse.json({
        success: false,
        error: 'Invalid response from Delhivery API',
        message: 'The API returned non-JSON data.',
        rawResponse: responseText.substring(0, 200),
        suggestion: 'Check your DELHIVERY_API_TOKEN and ensure it has the correct permissions',
      }, { status: 400 });
    }
    
    console.log('Warehouse check response:', data);

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return NextResponse.json({
          success: false,
          registered: false,
          message: 'No warehouse found. You need to register a warehouse on Delhivery.',
          warehouses: [],
          nextSteps: [
            '1. Go to https://track.delhivery.com (or staging if using staging)',
            '2. Login with your account',
            '3. Go to Settings > Warehouse',
            '4. Click "Add Warehouse"',
            '5. Fill in warehouse details:',
            `   - Name: ${process.env.DELHIVERY_WAREHOUSE_NAME || 'Agnishila Warehouse'}`,
            `   - Address: ${process.env.DELHIVERY_WAREHOUSE_ADDRESS}`,
            `   - City: ${process.env.DELHIVERY_WAREHOUSE_CITY}`,
            `   - State: ${process.env.DELHIVERY_WAREHOUSE_STATE}`,
            `   - Pin: ${process.env.DELHIVERY_WAREHOUSE_PIN}`,
            '6. Set working days (Monday-Friday, 9 AM - 6 PM)',
            '7. Save and note the warehouse ID'
          ]
        });
      }

      // Warehouse(s) found
      const warehouses = data.map((wh: any) => ({
        id: wh.id,
        name: wh.name,
        address: wh.address,
        city: wh.city,
        state: wh.state,
        pin: wh.pin,
        phone: wh.phone,
        email: wh.email,
        status: wh.status || 'active',
        workingDays: wh.working_days || 'Not configured',
        createdAt: wh.created_at,
      }));

      return NextResponse.json({
        success: true,
        registered: true,
        message: `Found ${warehouses.length} warehouse(s)`,
        warehouses: warehouses,
        configuration: {
          apiToken: apiToken.substring(0, 10) + '...' + apiToken.substring(-10),
          environment: process.env.DELHIVERY_ENVIRONMENT || 'staging',
          baseUrl: baseUrl,
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Unexpected response format',
      data: data
    });

  } catch (error: any) {
    console.error('Warehouse check error:', error.message);

    // Provide helpful error messages
    let errorMessage = 'Failed to check warehouse';
    let suggestion = '';

    if (error.message?.includes('401')) {
      errorMessage = 'Authentication failed - Invalid API token';
      suggestion = 'Check your DELHIVERY_API_TOKEN in .env file';
    } else if (error.message?.includes('404')) {
      errorMessage = 'Warehouse not found';
      suggestion = 'You need to register a warehouse on Delhivery dashboard';
    } else if (error.message?.includes('403')) {
      errorMessage = 'Access denied - Check your API token permissions';
      suggestion = 'Ensure your API token has warehouse management permissions';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Cannot connect to Delhivery API';
      suggestion = `Check if ${process.env.DELHIVERY_ENVIRONMENT === 'production' ? 'production' : 'staging'} URL is correct`;
    }

    return NextResponse.json({
      success: false,
      error: errorMessage,
      suggestion: suggestion,
      details: error.message,
      environment: process.env.DELHIVERY_ENVIRONMENT || 'staging',
      baseUrl: process.env.DELHIVERY_ENVIRONMENT === 'production'
        ? 'https://track.delhivery.com'
        : 'https://staging-express.delhivery.com',
    }, { status: 500 });
  }
}

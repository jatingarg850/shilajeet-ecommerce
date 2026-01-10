import axios from 'axios';

interface DelhiveryConfig {
  clientId: string;
  apiToken: string;
  baseUrl: string;
}

interface ShipmentData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  deliveryPin: string;
  weight?: number;
  paymentMode?: string;
}

class DelhiveryService {
  private config: DelhiveryConfig;

  constructor() {
    this.config = {
      clientId: process.env.DELHIVERY_CLIENT_ID || '',
      apiToken: process.env.DELHIVERY_API_TOKEN || '',
      baseUrl: process.env.DELHIVERY_ENVIRONMENT === 'production'
        ? process.env.DELHIVERY_PROD_URL || ''
        : process.env.DELHIVERY_TEST_URL || '',
    };
  }

  async createShipment(orderData: ShipmentData) {
    try {
      const payload = {
        format: 'json',
        data: {
          waybill: '',
          order_id: orderData.orderId,
          shipment_length: 10,
          shipment_width: 10,
          shipment_height: 10,
          weight: orderData.weight || 0.5,
          payment_mode: orderData.paymentMode || 'COD',
          pickup_location: process.env.DELHIVERY_WAREHOUSE_NAME,
          customer_name: orderData.customerName,
          customer_phone: orderData.customerPhone,
          customer_email: orderData.customerEmail,
          delivery_address: orderData.deliveryAddress,
          delivery_pin: orderData.deliveryPin,
          country: 'India',
          seller_name: 'Agnishila',
          seller_phone: process.env.SELLER_PHONE,
          seller_address: process.env.SELLER_ADDRESS,
          seller_gst_tin: process.env.SELLER_GST_TIN,
          hsn_code: '30049090',
          fragile_shipment: false,
        },
      };

      const response = await axios.post(
        `${this.config.baseUrl}/api/cmu/create/json/`,
        payload,
        {
          headers: {
            'Authorization': `Token ${this.config.apiToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Delhivery shipment creation error:', error);
      throw error;
    }
  }

  async trackShipment(waybill: string) {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/api/track/shipment/${waybill}/`,
        {
          headers: {
            'Authorization': `Token ${this.config.apiToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Delhivery tracking error:', error);
      throw error;
    }
  }

  async getShippingRates(pickupPin: string, deliveryPin: string, weight: number) {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/api/rates/`,
        {
          params: {
            pickup_pin: pickupPin,
            delivery_pin: deliveryPin,
            weight: weight,
          },
          headers: {
            'Authorization': `Token ${this.config.apiToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Delhivery rates error:', error);
      throw error;
    }
  }
}

export default new DelhiveryService();

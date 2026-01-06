# Delhivery Integration - Quick Start Guide

## 5-Minute Setup

### 1. Get API Credentials (2 minutes)

1. Go to: https://ucp.delhivery.com
2. Login to your Delhivery account
3. Navigate to: Developer Portal → Documents
4. Copy:
   - **Client ID** (your company name)
   - **API Token** (authentication key)
   - **Test URL** (sandbox)
   - **Production URL** (live)

### 2. Add Environment Variables (1 minute)

Add to `.env`:

```env
DELHIVERY_CLIENT_ID=your_client_id
DELHIVERY_API_TOKEN=your_api_token
DELHIVERY_TEST_URL=https://staging-express-api.delhivery.com
DELHIVERY_PROD_URL=https://express-api.delhivery.com
DELHIVERY_WAREHOUSE_NAME=Your_Warehouse_Name
DELHIVERY_ENVIRONMENT=test
SELLER_PHONE=9876543210
SELLER_ADDRESS=Your Warehouse Address
SELLER_GST_TIN=your_gst_number
```

### 3. Copy Implementation Files (2 minutes)

Copy from `DELHIVERY_INTEGRATION.md`:

1. **Service**: `lib/delhivery.ts`
2. **API Routes**: 
   - `app/api/shipments/delhivery/create/route.ts`
   - `app/api/shipments/delhivery/track/[waybill]/route.ts`
3. **Component**: `components/OrderTracking.tsx`

### 4. Update Order Model (1 minute)

Add to `models/Order.ts`:

```typescript
trackingNumber: String,
shippingProvider: String,
trackingStatus: String,
```

## Usage

### Create Shipment

```typescript
const response = await fetch('/api/shipments/delhivery/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ orderId: 'ORD-2025-001' }),
});

const { waybill, trackingUrl } = await response.json();
```

### Track Shipment

```typescript
const response = await fetch(`/api/shipments/delhivery/track/${waybill}`);
const tracking = await response.json();
```

### Display Tracking

```typescript
import OrderTracking from '@/components/OrderTracking';

<OrderTracking waybill="1234567890" />
```

## Testing

### Test Order

```json
{
  "orderId": "TEST-001",
  "customerName": "Test User",
  "customerPhone": "9876543210",
  "customerEmail": "test@example.com",
  "deliveryAddress": "123 Test St, Delhi, Delhi 110001",
  "deliveryPin": "110001",
  "weight": 0.5,
  "paymentMode": "COD"
}
```

### Expected Response

```json
{
  "success": true,
  "waybill": "1234567890",
  "trackingUrl": "https://track.delhivery.com/tracking/1234567890"
}
```

## Common Issues

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check API token and client ID |
| Invalid warehouse | Verify warehouse name matches exactly |
| Invalid pin | Use valid Indian pin code |
| Missing GST | Add GST for orders > ₹50,000 |

## Next Steps

1. ✅ Get credentials
2. ✅ Add environment variables
3. ✅ Copy implementation files
4. ✅ Update Order model
5. ✅ Test in sandbox
6. ✅ Deploy to production

## Resources

- **Full Guide**: See `DELHIVERY_INTEGRATION.md`
- **API Docs**: https://delhivery-express-api-doc.readme.io
- **Developer Portal**: https://ucp.delhivery.com/developer-portal/documents

---

**Time to implement**: ~30 minutes
**Status**: Ready to integrate

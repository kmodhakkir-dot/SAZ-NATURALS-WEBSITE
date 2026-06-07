# Backup Strategy for SAZ Naturals

## Database Backups (Supabase)

### Automatic Backups (Supabase Pro)
- Daily automatic backups retained for 7 days
- Point-in-time recovery available

### Manual Backup Export
Run this SQL to export critical data:

```sql
-- Export products
COPY (SELECT * FROM products) TO '/tmp/products-backup.csv' WITH CSV HEADER;

-- Export orders  
COPY (SELECT * FROM orders) TO '/tmp/orders-backup.csv' WITH CSV HEADER;

-- Export settings
COPY (SELECT * FROM settings) TO '/tmp/settings-backup.csv' WITH CSV HEADER;
```

## Recovery Procedures

### Product Data Loss
1. Re-run `scripts/seed-data.mjs` to restore default products
2. Custom products can be re-added via Admin Dashboard

### Order Data Loss
1. Orders are stored permanently in Supabase
2. If accidentally deleted, check Supabase point-in-time recovery
3. Contact Supabase support for data recovery

### Settings Loss
1. Default settings are hardcoded in `src/services/settingsService.js`
2. Admin can reconfigure via Settings tab

### Complete System Recovery
1. Re-deploy from GitHub (latest `main` branch)
2. Run `scripts/seed-data.mjs` to restore products/gallery
3. Re-create admin user in Supabase Auth
4. Run `scripts/add-profile-trigger.sql` to restore trigger
5. Run `scripts/fix-rls.sql` to restore RLS policies

## RTO (Recovery Time Objective)
- Frontend: 5 minutes (deploy from GitHub)
- Database: 15 minutes (Supabase restore)
- Full system: 30 minutes

## RPO (Recovery Point Objective)
- Orders: 0 data loss (real-time Supabase)
- Products/Gallery: Last admin change
- Settings: Last admin save
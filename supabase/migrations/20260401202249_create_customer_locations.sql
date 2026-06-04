/*
  # Create customer locations table

  1. New Tables
    - `customer_locations`
      - `id` (uuid, primary key) - Unique identifier
      - `company_name` (text) - Customer company name
      - `city` (text) - City location
      - `country` (text) - Country name
      - `latitude` (numeric) - Geographic latitude
      - `longitude` (numeric) - Geographic longitude
      - `website_url` (text, nullable) - Optional website URL
      - `logo_path` (text, nullable) - Optional logo file path
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `customer_locations` table
    - Add policy for public read access (customer map is publicly visible on website)
*/

CREATE TABLE IF NOT EXISTS customer_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  city text NOT NULL,
  country text NOT NULL DEFAULT 'Netherlands',
  latitude numeric(10, 7) NOT NULL,
  longitude numeric(10, 7) NOT NULL,
  website_url text,
  logo_path text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE customer_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customer locations are publicly readable"
  ON customer_locations
  FOR SELECT
  TO anon
  USING (true);

-- Insert customer data based on the logos in the app
INSERT INTO customer_locations (company_name, city, country, latitude, longitude, website_url, logo_path)
VALUES
  ('Valicare', 'Rotterdam', 'Netherlands', 51.9225, 4.4792, 'https://valicare.nl', '/logos/valicare.png'),
  ('Bouwhof', 'Rotterdam', 'Netherlands', 51.9225, 4.4792, 'https://bouwhof.nl', '/logos/bouwhof.svg'),
  ('Dutchwyse', 'Rotterdam', 'Netherlands', 51.9225, 4.4792, 'https://dutchwyse.nl', '/logos/dutchwyse.svg'),
  ('SVDE', 'Zoetermeer', 'Netherlands', 52.0575, 4.4934, 'https://www.svde.nl', '/logos/svde.png'),
  ('De Mooij', 'Zoetermeer', 'Netherlands', 52.0575, 4.4934, 'https://demooij-zoetermeer.nl', '/logos/demooij.svg'),
  ('MJ de Groot Transport', 'Waddinxveen', 'Netherlands', 52.0434, 4.6506, 'https://www.mjdegroottransport.nl', '/logos/mjdegroot.svg'),
  ('JNH Logistics', 'Rotterdam', 'Netherlands', 51.9225, 4.4792, 'https://jnhlogistics.com/nl/', '/logos/jnh.png'),
  ('Van der Windt Transport', 'Zoetermeer', 'Netherlands', 52.0575, 4.4934, 'https://www.vanderwindttransport.nl/', '/logos/windt.png'),
  ('VVW Transport', 'Rotterdam', 'Netherlands', 51.9225, 4.4792, 'https://vvwtransport.nl/', '/logos/vvw-transport.png'),
  ('MTC BV', 'Rotterdam', 'Netherlands', 51.9225, 4.4792, 'https://mtcbv.nl/', '/logos/mtc.svg'),
  ('Korevaar Logistics', 'Rotterdam', 'Netherlands', 51.9225, 4.4792, 'https://www.korevaarlogistics.nl/', '/logos/korevaar-logo.png'),
  ('EasyTrip', 'Rotterdam', 'Netherlands', 51.9225, 4.4792, 'https://www.easytrip.nl/', '/logos/easytrip.png'),
  ('KOV Transport', 'Rotterdam', 'Netherlands', 51.9225, 4.4792, 'https://www.kovtransport.nl/', '/logos/kov.png')
ON CONFLICT DO NOTHING;
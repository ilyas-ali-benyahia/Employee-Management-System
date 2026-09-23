import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import Employee from './models/Employee.js'

dotenv.config()

// The same exact data as the seedEmployees used in the frontend
// (we removed id because MongoDB creates _id automatically)
const seedEmployees = [
  { name: 'Olivia Bennett', email: 'olivia.bennett@northstar.co', phone: '+1 (415) 555-0192', department: 'Engineering', role: 'Senior Product Engineer', location: 'San Francisco, CA', joined: '2022-04-18', status: 'Active', color: 'coral' },
  { name: 'Marcus Chen', email: 'marcus.chen@northstar.co', phone: '+1 (206) 555-0138', department: 'Design', role: 'Product Designer', location: 'Seattle, WA', joined: '2023-01-09', status: 'Active', color: 'blue' },
  { name: 'Amara Okafor', email: 'amara.okafor@northstar.co', phone: '+1 (212) 555-0171', department: 'Marketing', role: 'Growth Marketing Lead', location: 'New York, NY', joined: '2021-09-27', status: 'Active', color: 'gold' },
  { name: 'James Wilson', email: 'james.wilson@northstar.co', phone: '+1 (312) 555-0164', department: 'Engineering', role: 'Backend Engineer', location: 'Chicago, IL', joined: '2022-11-14', status: 'On leave', color: 'lavender' },
  { name: 'Sofia Ramirez', email: 'sofia.ramirez@northstar.co', phone: '+1 (512) 555-0108', department: 'People', role: 'People Operations Manager', location: 'Austin, TX', joined: '2020-06-22', status: 'Active', color: 'mint' },
  { name: 'Noah Williams', email: 'noah.williams@northstar.co', phone: '+1 (617) 555-0117', department: 'Finance', role: 'Financial Analyst', location: 'Boston, MA', joined: '2023-08-07', status: 'Active', color: 'peach' },
]

async function seed() {
  await connectDB()
  await Employee.deleteMany() // clear the collection before inserting to avoid duplicate data
  await Employee.insertMany(seedEmployees)
  console.log('✅ Data seeded successfully')
  process.exit()
}

seed()

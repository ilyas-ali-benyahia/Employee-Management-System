export const departments = ['All departments', 'Engineering', 'Design', 'Marketing', 'People', 'Finance']

export const seedEmployees = [
  {
    id: 'EMP-1042',
    name: 'Olivia Bennett',
    email: 'olivia.bennett@northstar.co',
    phone: '+1 (415) 555-0192',
    department: 'Engineering',
    role: 'Senior Product Engineer',
    location: 'San Francisco, CA',
    joined: '2022-04-18',
    status: 'Active',
    color: 'coral',
  },
  {
    id: 'EMP-1038',
    name: 'Marcus Chen',
    email: 'marcus.chen@northstar.co',
    phone: '+1 (206) 555-0138',
    department: 'Design',
    role: 'Product Designer',
    location: 'Seattle, WA',
    joined: '2023-01-09',
    status: 'Active',
    color: 'blue',
  },
  {
    id: 'EMP-1035',
    name: 'Amara Okafor',
    email: 'amara.okafor@northstar.co',
    phone: '+1 (212) 555-0171',
    department: 'Marketing',
    role: 'Growth Marketing Lead',
    location: 'New York, NY',
    joined: '2021-09-27',
    status: 'Active',
    color: 'gold',
  },
  {
    id: 'EMP-1029',
    name: 'James Wilson',
    email: 'james.wilson@northstar.co',
    phone: '+1 (312) 555-0164',
    department: 'Engineering',
    role: 'Backend Engineer',
    location: 'Chicago, IL',
    joined: '2022-11-14',
    status: 'On leave',
    color: 'lavender',
  },
  {
    id: 'EMP-1024',
    name: 'Sofia Ramirez',
    email: 'sofia.ramirez@northstar.co',
    phone: '+1 (512) 555-0108',
    department: 'People',
    role: 'People Operations Manager',
    location: 'Austin, TX',
    joined: '2020-06-22',
    status: 'Active',
    color: 'mint',
  },
  {
    id: 'EMP-1017',
    name: 'Noah Williams',
    email: 'noah.williams@northstar.co',
    phone: '+1 (617) 555-0117',
    department: 'Finance',
    role: 'Financial Analyst',
    location: 'Boston, MA',
    joined: '2023-08-07',
    status: 'Active',
    color: 'peach',
  },
]

export function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}

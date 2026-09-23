import mongoose from 'mongoose'

// The Schema is the template that each employee follows in the database.
// Each field has a type and indicates whether it is required.
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true, // removes extra spaces at the beginning and end
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // the same email cannot be used twice
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      required: true,
      enum: ['Engineering', 'Design', 'Marketing', 'People', 'Finance'], // only these values are allowed
    },
    role: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    joined: {
      type: String, // keep it as String to match the "YYYY-MM-DD" format used by the frontend
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'On leave'],
      default: 'Active',
    },
    color: {
      type: String,
      default: 'blue',
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
)

// Mongoose creates an "employees" collection in the database using the name "Employee"
const Employee = mongoose.model('Employee', employeeSchema)

export default Employee

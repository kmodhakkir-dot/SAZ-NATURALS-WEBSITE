import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#14b8a6']

export function RevenueLineChart({ data }) {
  if (!data || data.length === 0) return <p className="text-gray-400 text-sm">No data available</p>
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(v) => (v >= 1000 ? (v/1000).toFixed(0) + 'K' : v)} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value) => 'TZS ' + Number(value).toLocaleString()}
          labelStyle={{ color: '#374151' }}
          contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
        />
        <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Revenue" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function OrdersBarChart({ data }) {
  if (!data || data.length === 0) return <p className="text-gray-400 text-sm">No data available</p>
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip labelStyle={{ color: '#374151' }} contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
        <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Orders" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CategoryPieChart({ data }) {
  if (!data || data.length === 0) return <p className="text-gray-400 text-sm">No data available</p>
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={100} label={(entry) => entry.label}>
          {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip formatter={(value) => 'TZS ' + Number(value).toLocaleString()} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function StatusPieChart({ data }) {
  if (!data || data.length === 0) return <p className="text-gray-400 text-sm">No data available</p>
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius={50} outerRadius={100}>
          {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
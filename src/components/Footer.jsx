export default function Footer({ onAdminClick }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xl font-heading font-bold text-foreground mb-3">
              <span>🌿</span>
              <span>SAZ Naturals</span>
            </div>
            <p className="text-sm text-foreground">Natural Beauty Starts Here</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
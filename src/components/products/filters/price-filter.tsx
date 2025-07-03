'use client';

export function PriceFilter() {
  return (
    <div className="bg-background p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-3">Rango de precios</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-foreground">
          <span>$0</span>
          <span>$1000+</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          className="w-full h-2 bg-secondary2 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between">
          <input
            type="number"
            placeholder="Mín"
            className="w-24 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Máx"
            className="w-24 p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
}
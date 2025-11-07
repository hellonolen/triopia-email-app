/**
 * Reusable Skeleton component for loading states
 * Renders within 100ms and shows until data resolves
 */

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ width = "100%", height = "20px", className = "" }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        background: "#F0EBE6",
        borderRadius: "3px",
        animation: "pulse 1.5s ease-in-out infinite"
      }}
    />
  );
}

export function EmailListSkeleton() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{
          padding: "12px 16px",
          borderBottom: "1px solid #F8F6F4"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <Skeleton width="120px" height="12px" />
            <Skeleton width="60px" height="10px" />
          </div>
          <Skeleton width="80%" height="14px" className="mb-2" />
          <Skeleton width="90%" height="11px" />
        </div>
      ))}
    </div>
  );
}

export function EmailDetailSkeleton() {
  return (
    <div style={{ padding: "24px" }}>
      <Skeleton width="200px" height="24px" className="mb-4" />
      <div style={{ marginBottom: "16px" }}>
        <Skeleton width="150px" height="12px" className="mb-2" />
        <Skeleton width="180px" height="12px" />
      </div>
      <div style={{ marginTop: "24px" }}>
        <Skeleton width="100%" height="16px" className="mb-3" />
        <Skeleton width="100%" height="16px" className="mb-3" />
        <Skeleton width="90%" height="16px" className="mb-3" />
        <Skeleton width="95%" height="16px" />
      </div>
    </div>
  );
}

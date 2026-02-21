import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SkeletonBlock = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.skeletonBase} 25%,
    ${({ theme }) => theme.skeletonHighlight} 50%,
    ${({ theme }) => theme.skeletonBase} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${({ radius }) => radius || "4px"};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "16px"};
  margin-bottom: ${({ mb }) => mb || "0"};
`;

const Skeleton = () => (
  <div className="row p-lg-4 p-2">
    <div className="col-sm-12 col-lg-3 pb-3 d-flex justify-content-center align-items-start">
      <SkeletonBlock width="120px" height="120px" radius="50%" />
    </div>
    <div className="col-sm-12 col-lg-9">
      <SkeletonBlock width="55%" height="22px" mb="10px" />
      <SkeletonBlock width="35%" height="14px" mb="20px" />
      <SkeletonBlock width="100%" height="14px" mb="8px" />
      <SkeletonBlock width="75%" height="14px" mb="20px" />
      <SkeletonBlock width="100%" height="60px" radius="15px" mb="20px" />
      <div className="row">
        <div className="col-6">
          <SkeletonBlock width="80%" height="14px" mb="10px" />
          <SkeletonBlock width="70%" height="14px" />
        </div>
        <div className="col-6">
          <SkeletonBlock width="80%" height="14px" mb="10px" />
          <SkeletonBlock width="70%" height="14px" />
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;

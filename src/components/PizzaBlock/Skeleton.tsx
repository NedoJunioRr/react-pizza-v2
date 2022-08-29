import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props:any) => (
    <ContentLoader className='pizza-block'
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="135" cy="140" r="130" />
        <rect x="1" y="283" rx="13" ry="13" width="280" height="25" />
        <rect x="7" y="331" rx="10" ry="10" width="280" height="69" />
        <rect x="4" y="428" rx="14" ry="14" width="83" height="34" />
        <rect x="143" y="427" rx="21" ry="21" width="140" height="38" />
    </ContentLoader>
)

export default Skeleton
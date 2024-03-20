// import React, { ReactNode } from "react";
// import PropTypes from "prop-types";
// import {
//   Card as MaterialCard,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
// } from "@material-tailwind/react";

// interface CardProps {
//   title: ReactNode;
//   color?: string;
//   children: ReactNode;
//   // Add other necessary props based on the Card component's definition
// }

// export function StatisticsCard({ color, icon, title, value, footer }: StatisticsCardProps) {
//   return (
//     <MaterialCard title={title} color={color} className="border border-blue-gray-100 shadow-sm">
//       <CardHeader
//         variant="gradient"
//         color={color}
//         floated={false}
//         shadow={false}
//         className="absolute grid h-12 w-12 place-items-center"
//       >
//         {icon}
//       </CardHeader>
//       <CardBody className="p-4 text-right">
//         <Typography variant="small" className="font-normal text-blue-gray-600">
//           {title}
//         </Typography>
//         <Typography variant="h4" color="blue-gray">
//           {value}
//         </Typography>
//       </CardBody>
//       {footer && (
//         <CardFooter className="border-t border-blue-gray-50 p-4">
//           {footer}
//         </CardFooter>
//       )}
//     </MaterialCard>
//   );
// }

// StatisticsCard.defaultProps = {
//   color: "blue",
//   footer: null,
// };

// StatisticsCard.propTypes = {
//   color: PropTypes.oneOf([
//     // ... your color options
//   ]),
//   icon: PropTypes.node.isRequired,
//   title: PropTypes.node.isRequired,
//   value: PropTypes.node.isRequired,
//   footer: PropTypes.node,
// };

// export default StatisticsCard;

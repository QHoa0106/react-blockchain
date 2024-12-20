import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement, // Đăng ký PointElement
  CategoryScale,
  LinearScale,
} from "chart.js";

// Đăng ký các phần tử của Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement, // Đăng ký PointElement
  CategoryScale,
  LinearScale
);

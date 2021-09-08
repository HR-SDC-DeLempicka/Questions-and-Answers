import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 1000,
  duration: '30s'
};
// ${Math.floor(Math.random() * 1000011)}
export default function () {
  http.get(`http://18.190.158.159:3000/api/qa/questions?product_id=${Math.floor(Math.random() * 1000011)}`);
  sleep(1);
}
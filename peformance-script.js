import { check, group } from "k6";
import http from "k6/http"
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  // Key configurations for breakpoint in this section
  executor: 'ramping-arrival-rate', //Assure load increase if the system slows
  stages: [
    { duration: '2s', target: 20000 }, // just slowly ramp-up to a HUGE load
  ],
};
export default function(){
    group('K6 Get Test', ()=> {
        let response1 = http.get('https://test.k6.io');
        check( response1, {
            'is status 200': (r) => r.status == 200
        })
    
    })

}

export function handleSummary(data) {
    return {
      "script-result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }
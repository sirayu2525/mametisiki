// src/types/probe-image-size.d.ts
declare module 'probe-image-size' {
    interface ProbeResult {
      width: number;
      height: number;
      type: string;
      mime: string;
      wUnits?: string;
      hUnits?: string;
      url: string;
      length: number;
    }
  
    function probe(url: string): Promise<ProbeResult>;
  
    export = probe;
  }
  
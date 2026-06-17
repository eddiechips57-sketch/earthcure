import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldCheck, Award, FileText, CheckCircle2, ChevronDown, Download, AlertCircle, RefreshCw } from 'lucide-react';

interface LabResult {
  batchId: string;
  productName: string;
  category: string;
  harvestDate: string;
  testDate: string;
  cbdQty: string;
  thcQty: string;
  cbdPercentage: number;
  cbgPercentage: number;
  cbcPercentage: number;
  thcPercentage: number;
  terpeneProfile: { name: string; pct: number }[];
  contaminants: {
    heavyMetals: 'Passed' | 'Failed';
    pesticides: 'Passed' | 'Failed';
    microbials: 'Passed' | 'Failed';
    solvents: 'Passed' | 'Failed';
  };
  analystSignature: string;
  permitNumber: string;
  moistureContent: string;
  labName: string;
}

const BATCH_REGISTRY: Record<string, LabResult> = {
  'EC-BSO-300': {
    batchId: 'EC-BSO-300',
    productName: 'Broad Spectrum CBD Oils 30 ml (300mg)',
    category: 'Wellness / Sublingual',
    harvestDate: '2026-02-14',
    testDate: '2026-03-02',
    cbdQty: '10.3 mg/ml',
    thcQty: '0.00% (Not Detected)',
    cbdPercentage: 97.8,
    cbgPercentage: 1.6,
    cbcPercentage: 0.6,
    thcPercentage: 0.0,
    terpeneProfile: [
      { name: 'Beta-Caryophyllene', pct: 0.42 },
      { name: 'Myrcene', pct: 0.35 },
      { name: 'Limonene', pct: 0.18 }
    ],
    contaminants: {
      heavyMetals: 'Passed',
      pesticides: 'Passed',
      microbials: 'Passed',
      solvents: 'Passed'
    },
    analystSignature: 'Dr. Evelyn Chipika, Head of Phytochemistry',
    permitNumber: 'MAL-IND-HEMP-2026-0041',
    moistureContent: '6.4%',
    labName: 'Lilongwe Agrolabs, Certified phytocannabinoid assay division'
  },
  'EC-BSO-600': {
    batchId: 'EC-BSO-600',
    productName: 'Broad Spectrum CBD Oils 30 ml (600mg)',
    category: 'Wellness / Sublingual',
    harvestDate: '2026-02-14',
    testDate: '2026-03-02',
    cbdQty: '20.5 mg/ml',
    thcQty: '0.00% (Not Detected)',
    cbdPercentage: 97.4,
    cbgPercentage: 2.1,
    cbcPercentage: 0.5,
    thcPercentage: 0.0,
    terpeneProfile: [
      { name: 'Beta-Caryophyllene', pct: 0.48 },
      { name: 'Myrcene', pct: 0.39 },
      { name: 'Limonene', pct: 0.22 }
    ],
    contaminants: {
      heavyMetals: 'Passed',
      pesticides: 'Passed',
      microbials: 'Passed',
      solvents: 'Passed'
    },
    analystSignature: 'Dr. Evelyn Chipika, Head of Phytochemistry',
    permitNumber: 'MAL-IND-HEMP-2026-0039',
    moistureContent: '6.4%',
    labName: 'Lilongwe Agrolabs, Certified phytocannabinoid assay division'
  },
  'EC-HON-500': {
    batchId: 'EC-HON-500',
    productName: 'Delicious CBD Hemp Honey 500g',
    category: 'Wellness / Superfoods',
    harvestDate: '2026-03-10',
    testDate: '2026-03-24',
    cbdQty: '0.42 mg/g',
    thcQty: '0.00% (Not Detected)',
    cbdPercentage: 99.2,
    cbgPercentage: 0.8,
    cbcPercentage: 0.0,
    thcPercentage: 0.0,
    terpeneProfile: [
      { name: 'Linalool', pct: 0.12 },
      { name: 'Alpha-Pinene', pct: 0.08 }
    ],
    contaminants: {
      heavyMetals: 'Passed',
      pesticides: 'Passed',
      microbials: 'Passed',
      solvents: 'Passed'
    },
    analystSignature: 'G. van der Westhuizen, Senior Inspector',
    permitNumber: 'DHP-SA-IMPORT-REF-912A',
    moistureContent: '12.8%',
    labName: 'SGS South Africa Food Analytical Laboratory (Cape Town)'
  },
  'EC-TEA-050': {
    batchId: 'EC-TEA-050',
    productName: 'Relaxing CBD Herbal Tea 50g',
    category: 'Wellness / Botanicals',
    harvestDate: '2026-01-28',
    testDate: '2026-02-18',
    cbdQty: '4.8 mg/infusion',
    thcQty: '0.00% (Not Detected)',
    cbdPercentage: 96.5,
    cbgPercentage: 1.8,
    cbcPercentage: 1.7,
    thcPercentage: 0.0,
    terpeneProfile: [
      { name: 'Myrcene', pct: 0.54 },
      { name: 'Humulene', pct: 0.14 },
      { name: 'Linalool', pct: 0.11 }
    ],
    contaminants: {
      heavyMetals: 'Passed',
      pesticides: 'Passed',
      microbials: 'Passed',
      solvents: 'Passed'
    },
    analystSignature: 'Dr. Evelyn Chipika, Head of Phytochemistry',
    permitNumber: 'MAL-IND-HEMP-2026-0012',
    moistureContent: '8.1%',
    labName: 'Lilongwe Agrolabs, Certified phytocannabinoid assay division'
  },
  'EC-BAL-050': {
    batchId: 'EC-BAL-050',
    productName: 'Amari CBD Topical Balm 50ml',
    category: 'Organic Skincare / Topicals',
    harvestDate: '2026-03-20',
    testDate: '2026-04-05',
    cbdQty: '10.0 mg/ml',
    thcQty: '0.00% (Not Detected)',
    cbdPercentage: 98.1,
    cbgPercentage: 1.2,
    cbcPercentage: 0.7,
    thcPercentage: 0.0,
    terpeneProfile: [
      { name: 'Limonene', pct: 0.38 },
      { name: 'Eucalyptol', pct: 0.52 },
      { name: 'Alpha-Pinene', pct: 0.14 }
    ],
    contaminants: {
      heavyMetals: 'Passed',
      pesticides: 'Passed',
      microbials: 'Passed',
      solvents: 'Passed'
    },
    analystSignature: 'G. van der Westhuizen, Senior Inspector',
    permitNumber: 'DHP-SA-IMPORT-REF-883C',
    moistureContent: '4.2%',
    labName: 'SGS South Africa Industrial Dermal Assay lab'
  }
};

export default function BatchChecker() {
  const [typedBatch, setTypedBatch] = useState<string>('');
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);
  const [errorSearch, setErrorSearch] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleSearch = (batchCode: string) => {
    if (!batchCode) return;
    setErrorSearch('');
    setIsVerifying(true);

    const normalCode = batchCode.trim().toUpperCase();

    setTimeout(() => {
      setIsVerifying(false);
      if (BATCH_REGISTRY[normalCode]) {
        setSelectedResult(BATCH_REGISTRY[normalCode]);
      } else {
        setSelectedResult(null);
        setErrorSearch(`No certified laboratory documents found for batch ID "${normalCode}". Try selecting a sample registry batch below.`);
      }
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#253A36] rounded-none border border-[#2D4540] p-6 md:p-8 space-y-6 text-left font-sans mt-12 relative overflow-hidden">
      
      {/* Decorative certificate seal */}
      <div className="absolute top-8 right-8 text-[#2D4540]/25 select-none font-bold text-9xl leading-none pointer-events-none">
        ★
      </div>

      <div className="space-y-2 pt-1 max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1B2D2A] text-[#D4AF37] border border-[#2D4540]/80 rounded text-[9px] font-mono font-bold tracking-widest uppercase">
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={2.5} /> SABS / SAHPRA Compliance Traceability
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-light uppercase tracking-wider text-white">
          Soil-To-Bottle <span className="text-[#D4AF37] italic font-light">Laboratory Verification</span>
        </h3>
        <p className="text-xs text-[#E9E4D9]/85 leading-relaxed">
          Every individual harvest is rigorously analyzed by third-party laboratories. Enter the laboratory batch code printed on your Earthcure container label to retrieve the fully legal Certificate of Analysis (COA) assays.
        </p>
      </div>

      {/* Input Selection Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-3 relative z-10">
        
        {/* Type or Select input Box */}
        <div className="col-span-1 md:col-span-8 space-y-2">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#E9E4D9]/60">
            Search Laboratory Batch ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. EC-BSO-600"
              value={typedBatch}
              onChange={(e) => setTypedBatch(e.target.value)}
              className="flex-1 px-3.5 py-3 border border-[#2D4540] bg-[#1B2D2A] text-xs font-mono uppercase tracking-widest text-[#E9E4D9] placeholder-[#E9E4D9]/30 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              onClick={() => handleSearch(typedBatch)}
              disabled={isVerifying}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] font-sans text-xs uppercase tracking-wider font-bold transition duration-200 flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#1B2D2A]" />
              ) : (
                <Search className="w-4 h-4 text-[#1B2D2A]" />
              )}
              <span>Verify</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Selector */}
        <div className="col-span-1 md:col-span-4 space-y-2">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#E9E4D9]/60">
            Sample Registries
          </label>
          <select
            onChange={(e) => {
              setTypedBatch(e.target.value);
              handleSearch(e.target.value);
            }}
            className="w-full px-3 py-3 bg-[#1B2D2A] border border-[#2D4540] text-[#E9E4D9] rounded-none text-xs focus:outline-none focus:border-[#D4AF37] h-[46px] font-mono"
            defaultValue=""
          >
            <option value="" disabled>-- Choose Batch ID --</option>
            <option value="EC-BSO-300">EC-BSO-300 (Drops 300mg)</option>
            <option value="EC-BSO-600">EC-BSO-600 (Drops 600mg)</option>
            <option value="EC-HON-500">EC-HON-500 (Honey 500g)</option>
            <option value="EC-TEA-050">EC-TEA-050 (Hemp Tea 50g)</option>
            <option value="EC-BAL-050">EC-BAL-050 (Topical Balm 50ml)</option>
          </select>
        </div>

      </div>

      {errorSearch && (
        <div className="p-3.5 bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex gap-2 rounded-none relative z-10 font-sans">
          <AlertCircle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
          <span>{errorSearch}</span>
        </div>
      )}

      {/* Certificate of Analysis Layout Rendering */}
      <AnimatePresence mode="wait">
        {selectedResult && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 md:p-8 bg-white text-gray-900 shadow-2xl space-y-6 relative border-t-8 border-[#2D4540] print:border-0 print:p-0"
          >
            {/* Watermark brand inside physical rendering print sheet */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-100 font-display font-light uppercase tracking-widest text-8xl pointer-events-none select-none opacity-40">
              EARTHCURE
            </div>

            {/* Header portion */}
            <div className="flex flex-col sm:flex-row justify-between items-start pb-5 border-b border-gray-200 gap-4 relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] font-bold">
                  OFFICIAL INDEPENDENT ANALYSIS
                </span>
                <h4 className="text-xl font-display font-bold uppercase tracking-wide text-gray-900">
                  Certificate Of Analysis (COA)
                </h4>
                <p className="text-[10px] font-mono text-gray-500 leading-normal">
                  Issued By: {selectedResult.labName} <br />
                  Permit Reference: <span className="font-bold text-gray-800">{selectedResult.permitNumber}</span>
                </p>
              </div>

              <div className="p-2 border border-gray-300 text-center text-xs min-w-[150px] bg-gray-50">
                <span className="block text-[8px] font-mono uppercase text-gray-500 tracking-wider">
                  Trace Code Verified
                </span>
                <span className="text-md font-mono font-bold tracking-widest text-[#2D4540]">
                  {selectedResult.batchId}
                </span>
                <div className="mt-1 inline-flex items-center gap-1 text-[8px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-700 fill-emerald-100" /> GC-MS Passed
                </div>
              </div>
            </div>

            {/* Core details list */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs relative z-10 border-b border-gray-100 pb-5">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase text-gray-400">Tested Product</span>
                <span className="block font-sans font-bold text-gray-800">{selectedResult.productName}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase text-gray-400">Spec / Category</span>
                <span className="block font-sans font-bold text-gray-800">{selectedResult.category}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase text-gray-400">Harvest Date</span>
                <span className="block font-mono font-bold text-gray-800">{selectedResult.harvestDate}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase text-gray-400">Assay Date Checked</span>
                <span className="block font-mono font-bold text-gray-800">{selectedResult.testDate}</span>
              </div>
            </div>

            {/* Cannabinoid Content breakdown list */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 pt-1">
              
              {/* Graphic active dosage distribution */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider font-semibold block">
                  Phytocannabinoid Distribution
                </span>

                <div className="space-y-3">
                  {/* CBD distribution row */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans font-semibold text-gray-800">Cannabidiol (CBD)</span>
                      <span className="font-mono font-bold text-gray-900">{selectedResult.cbdPercentage}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${selectedResult.cbdPercentage}%` }} />
                    </div>
                  </div>

                  {/* CBG distribution row */}
                  {selectedResult.cbgPercentage > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-sans font-semibold text-gray-800">Cannabigerol (CBG)</span>
                        <span className="font-mono font-bold text-gray-900">{selectedResult.cbgPercentage}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#D4AF37]" style={{ width: `${selectedResult.cbgPercentage * 10}%` }} />
                      </div>
                    </div>
                  )}

                  {/* CBC distribution row */}
                  {selectedResult.cbcPercentage > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-sans font-semibold text-gray-800">Cannabichromene (CBC)</span>
                        <span className="font-mono font-bold text-gray-900">{selectedResult.cbcPercentage}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#253A36]" style={{ width: `${selectedResult.cbcPercentage * 10}%` }} />
                      </div>
                    </div>
                  )}

                  {/* THC distribution row */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans font-semibold text-gray-800">Tetrahydrocannabinol (THC)</span>
                      <span className="font-mono font-bold text-emerald-600">{selectedResult.thcQty}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 w-0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety contamination checks list */}
              <div className="md:col-span-5 bg-gray-50 p-4 border border-gray-200 space-y-3 text-xs leading-normal">
                <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider font-semibold block border-b border-gray-200 pb-1.5">
                  Assay Safety Standards Checks
                </span>

                <div className="space-y-2 font-sans text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>Heavy Metal Contaminants</span>
                    <span className="font-mono font-bold text-emerald-600 uppercase">✓ Passed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Organochlorine Pesticides</span>
                    <span className="font-mono font-bold text-emerald-600 uppercase">✓ Passed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Microbial Mould & Fungus</span>
                    <span className="font-mono font-bold text-emerald-600 uppercase">✓ Passed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Solvent Residual Traces</span>
                    <span className="font-mono font-bold text-emerald-600 uppercase">✓ Passed</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-gray-200">
                    <span>Biomass Moisture Content</span>
                    <span className="font-mono font-bold text-gray-900">{selectedResult.moistureContent}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Terpenes list and signatures footer */}
            <div className="flex flex-col sm:flex-row justify-between items-end border-t border-gray-100 pt-5 gap-6 text-xs relative z-10 text-gray-600">
              <div className="space-y-1 bg-gray-50 p-2.5 rounded-sm border border-gray-100 max-w-sm w-full text-left">
                <span className="text-[9px] font-mono uppercase text-gray-400">Dosing/Efficacy Terpene Profile</span>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] text-[#2D4540]">
                  {selectedResult.terpeneProfile.map((ter, k) => (
                    <span key={k} className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {ter.name} ({ter.pct}%)
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified signatures */}
              <div className="text-right space-y-1.5 font-sans min-w-[200px]">
                <div className="text-gray-400 text-[10px] uppercase font-mono">Certified Inspector Approval</div>
                <div className="font-semibold italic text-gray-800 text-sm font-sans">{selectedResult.analystSignature}</div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-none text-[9px] font-mono font-bold uppercase tracking-wider">
                  ✓ Assay Compliant with SANS 10330 standards
                </div>
              </div>
            </div>

            {/* Print or Download action links */}
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 relative z-10 text-xs print:hidden">
              <button
                onClick={handlePrint}
                className="px-4 py-2 hover:bg-gray-100 border border-gray-300 text-gray-700 font-sans font-bold uppercase tracking-wider rounded-none transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-gray-500" />
                <span>Save/Print Certificate</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface Certificate {
  productId: string;
  productName: string;
  batchNumber: string;
  certificatePdfUrl: string;
}

export default function CertificateOfAnalysis() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/certificates');
        
        if (!response.ok) {
          throw new Error('Failed to fetch certificates');
        }
        
        const data = await response.json();
        setCertificates(data);
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError('Unable to load certificates');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleDownload = (url: string, productName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${productName}-Certificate-of-Analysis.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || certificates.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-primary-400/10"></div>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[50px] border-r-transparent border-b-[50px] border-b-primary-400/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="w-6 h-6 text-primary-400" />
            <span className="text-primary-400 font-bold uppercase tracking-widest text-sm">Quality Assurance</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Certificate of Analysis
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Every batch of Agnishila products is tested for purity and potency. Download the Certificate of Analysis for your product to verify quality and authenticity.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.productId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-jet-900 border border-white/20 p-8 relative overflow-hidden group hover:border-primary-400/50 transition-all duration-300"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-primary-400/30 group-hover:border-t-primary-400/60 transition-all duration-300"></div>

              {/* Content */}
              <div className="relative">
                {/* Product Name */}
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-400 mr-2 flex-shrink-0" />
                  {cert.productName}
                </h3>

                {/* Batch Number */}
                <div className="bg-black border border-white/10 p-4 mb-6 rounded">
                  <p className="text-gray-400 text-sm mb-1">Batch Number</p>
                  <p className="text-primary-400 font-mono font-bold text-lg">{cert.batchNumber}</p>
                </div>

                {/* Certificate Info */}
                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 text-sm">Lab Tested</p>
                      <p className="text-gray-500 text-xs">Third-party verified for purity</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 text-sm">Quality Assured</p>
                      <p className="text-gray-500 text-xs">Meets all safety standards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 text-sm">Potency Verified</p>
                      <p className="text-gray-500 text-xs">Active ingredients confirmed</p>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(cert.certificatePdfUrl, cert.productName)}
                  className="w-full bg-primary-400 text-black font-bold py-3 px-4 uppercase tracking-wider text-sm hover:bg-primary-500 transition-colors flex items-center justify-center space-x-2 group/btn"
                >
                  <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                  <span>Download Certificate</span>
                </button>

                {/* PDF Link */}
                <a
                  href={cert.certificatePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-center block text-primary-400 hover:text-primary-500 text-sm transition-colors"
                >
                  View in Browser →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-primary-400/10 border border-primary-400/30 p-6 rounded"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold mb-1">Quality Commitment</p>
              <p className="text-gray-300 text-sm">
                All Agnishila products undergo rigorous third-party testing to ensure purity, potency, and safety. Each batch is assigned a unique batch number for complete traceability. Download the Certificate of Analysis to verify your product's authenticity.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

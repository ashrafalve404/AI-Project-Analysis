'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center"
      >
        <Bot className="w-8 h-8 text-white" />
      </motion.div>
    </div>
  );
}
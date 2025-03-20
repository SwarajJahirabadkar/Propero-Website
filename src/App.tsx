import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check, ChevronRight, Info, MessageSquare, Mail, Building2, Download, ArrowUp, Bell, Zap, Shield, Slack, ArrowRight } from 'lucide-react';

function FloatingLabel({ id, label, type = 'text', value, onChange, error, info, placeholder }) {
  return (
    <div className="relative mb-6">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`peer w-full px-4 py-3 rounded-lg border ${
          error ? 'border-red-300' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white`}
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
      {info && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-400" />
            <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded p-2">
              {info}
            </div>
          </div>
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
      {!error && value && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-orange-500" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

function GuideStep({ number, title, description }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: number * 0.2 }}
      className="flex gap-4 items-start"
    >
      <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-semibold">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    channel: '',
    webhook: '',
    email: '',
    company: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowSuccess(true);
    setIsLoading(false);
  };

  const highlights = [
    "Real-time Shopify updates",
    "Seamless Slack integration",
    "Instant notifications",
    "24/7 monitoring"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back to Top Button */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
      >
        <ArrowUp className="w-5 h-5 text-gray-600" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Subscribe to Shopify Status Updates
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get real-time notifications about Shopify's system status directly in your Slack channel.
            Stay informed and never miss critical updates.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <form onSubmit={handleSubmit}>
              <FloatingLabel
                id="channel"
                label="Slack Channel Name"
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                error={errors.channel}
                info="Enter your Slack channel name without the # symbol"
                placeholder="e.g., shopify-status"
              />
              <FloatingLabel
                id="webhook"
                label="Slack Webhook URL"
                value={formData.webhook}
                onChange={(e) => setFormData({ ...formData, webhook: e.target.value })}
                error={errors.webhook}
                info="Find this in your Slack app settings"
                placeholder="https://hooks.slack.com/services/..."
              />
              <FloatingLabel
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                info="We'll send confirmation and important updates here"
                placeholder="your@company.com"
              />
              <FloatingLabel
                id="company"
                label="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                error={errors.company}
                info="This helps us personalize your experience"
                placeholder="Acme Inc"
              />

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium
                    hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/20
                    transform active:scale-95 transition-all ${isLoading ? 'opacity-75' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Subscribe Now'}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium
                    hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500/20
                    transform active:scale-95 transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Setup Guide
                </button>
              </div>
            </form>
          </motion.div>

          {/* Preview Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <h3 className="text-lg font-semibold mb-6">Preview Configuration</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Slack Channel</p>
                  <p className="text-gray-600">{formData.channel || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <p className="text-gray-600">{formData.email || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Company</p>
                  <p className="text-gray-600">{formData.company || 'Not set'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights Carousel */}
        <div className="relative overflow-hidden my-16 py-4">
          <div className="flex animate-scroll">
            {[...highlights, ...highlights].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-gray-600 whitespace-nowrap mx-8"
              >
                <ChevronRight className="w-4 h-4 text-orange-500" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Setup Guide Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Slack className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
              <p className="text-gray-600">Follow these simple steps to get started with Slack notifications</p>
            </div>
          </div>

          <div className="space-y-8">
            <GuideStep
              number={1}
              title="Create a Slack Channel"
              description="Start by creating a dedicated channel in your Slack workspace where you want to receive Shopify status updates."
            />
            <GuideStep
              number={2}
              title="Set Up Incoming Webhooks"
              description="Go to your Slack workspace settings, navigate to 'Apps & Integrations', and create a new Incoming Webhook for your channel."
            />
            <GuideStep
              number={3}
              title="Copy Webhook URL"
              description="Once the webhook is created, copy the provided webhook URL. This is what you'll paste in the form above."
            />
            <GuideStep
              number={4}
              title="Start Receiving Updates"
              description="After subscribing, you'll start receiving real-time updates about Shopify's system status in your specified channel."
            />
          </div>

          <div className="mt-8 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Need help? Check out our detailed setup guide or contact our support team.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={Bell}
            title="Instant Alerts"
            description="Receive immediate notifications about system status changes directly in your Slack channel."
            delay={0.2}
          />
          <FeatureCard
            icon={Zap}
            title="Real-time Updates"
            description="Stay informed with live updates about Shopify's performance and maintenance schedules."
            delay={0.4}
          />
          <FeatureCard
            icon={Shield}
            title="Proactive Monitoring"
            description="Get ahead of potential issues with our 24/7 monitoring and early warning system."
            delay={0.6}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
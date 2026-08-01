import React from 'react'

const FeatureSection = ({features}) => {
    return (
        <div className='py-16 bg-white'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Everything you need for the file sharing
                    </h2>
                    <p className='mt-4 max-w-2xl mx-auto text-xl text-gray-500'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;

                            return (
                                <div key={index} className='pt-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer'>
                                    <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 ">
                                        <div className="-mt-6">
                                            <div className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
                                                <Icon color={feature.iconColor ? feature.iconColor : 'currentColor'}/>
                                            </div>

                                            <h3 className="mt-5 text-lg font-medium text-gray-900 tracking-tight">
                                                {feature.title}
                                            </h3>

                                            <p className="mt-2 text-base text-gray-500">
                                                {feature.description}
                                            </p>

                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default FeatureSection

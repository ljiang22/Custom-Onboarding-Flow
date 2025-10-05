'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { OnboardingConfig, ComponentConfig, ComponentType } from '../../types';
import { configApi } from '../../lib/api';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from '@/components/SortableItem';

export default function AdminPage() {
  const [config, setConfig] = useState<OnboardingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const configData = await configApi.getConfig();
        setConfig(configData);
      } catch (error) {
        console.error('Failed to load config:', error);
        setMessage('Failed to load configuration');
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const availableComponents: ComponentType[] = ['aboutMe', 'address', 'birthdate'];

  const getComponentLabel = (type: ComponentType): string => {
    switch (type) {
      case 'aboutMe':
        return 'About Me';
      case 'address':
        return 'Address';
      case 'birthdate':
        return 'Birthdate';
      default:
        return type;
    }
  };

  const isComponentAvailable = (pageType: 'page2' | 'page3', componentType: ComponentType): boolean => {
    if (!config) return false;
    
    const currentPageComponents = pageType === 'page2' ? config.page2Components : config.page3Components;
    const otherPageComponents = pageType === 'page2' ? config.page3Components : config.page2Components;
    
    // Check if component is already on current page
    const existsOnCurrentPage = currentPageComponents.some(comp => comp.type === componentType);
    if (existsOnCurrentPage) return false;
    
    // Check if component is already on other page
    const existsOnOtherPage = otherPageComponents.some(comp => comp.type === componentType);
    if (existsOnOtherPage) return false;
    
    return true;
  };

  const handleDragEnd = (event: DragEndEvent, pageType: 'page2' | 'page3') => {
    const { active, over } = event;
    
    if (!over || !config) return;

    const components = pageType === 'page2' ? config.page2Components : config.page3Components;
    
    // Find indices by matching the component type and order in the ID
    const oldIndex = components.findIndex((item, index) => `${pageType}-${index}` === active.id);
    const newIndex = components.findIndex((item, index) => `${pageType}-${index}` === over.id);

    if (oldIndex !== newIndex && oldIndex !== -1 && newIndex !== -1) {
      const newComponents = arrayMove(components, oldIndex, newIndex);
      
      // Update order numbers
      const updatedComponents = newComponents.map((comp, index) => ({
        ...comp,
        order: index + 1,
      }));

      setConfig({
        ...config,
        [pageType === 'page2' ? 'page2Components' : 'page3Components']: updatedComponents,
      });
    }
  };

  const addComponent = (pageType: 'page2' | 'page3', componentType: ComponentType) => {
    if (!config) return;

    const components = pageType === 'page2' ? config.page2Components : config.page3Components;
    
    // Check if component type already exists on this page
    const componentExistsOnCurrentPage = components.some(comp => comp.type === componentType);
    if (componentExistsOnCurrentPage) {
      setMessage(`${getComponentLabel(componentType)} is already added to this page`);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Check if component type already exists on the other page
    const otherPageComponents = pageType === 'page2' ? config.page3Components : config.page2Components;
    const componentExistsOnOtherPage = otherPageComponents.some(comp => comp.type === componentType);
    if (componentExistsOnOtherPage) {
      const otherPageName = pageType === 'page2' ? 'Page 3' : 'Page 2';
      setMessage(`${getComponentLabel(componentType)} is already used on ${otherPageName}. Each component can only be used on one page.`);
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    const maxOrder = components.length > 0 ? Math.max(...components.map(c => c.order)) : 0;

    const newComponent: ComponentConfig = {
      type: componentType,
      order: maxOrder + 1,
    };

    setConfig({
      ...config,
      [pageType === 'page2' ? 'page2Components' : 'page3Components']: [
        ...components,
        newComponent,
      ],
    });
  };

  const removeComponent = (pageType: 'page2' | 'page3', index: number) => {
    if (!config) return;

    const components = pageType === 'page2' ? config.page2Components : config.page3Components;
    
    // Prevent removing the last component from any page
    if (components.length <= 1) {
      setMessage(`Cannot remove the last component from ${pageType === 'page2' ? 'Page 2' : 'Page 3'}. Each page must have at least one component.`);
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    console.log(`Removing component from ${pageType} at index ${index}`);
    
    const newComponents = components.filter((_, i) => i !== index);

    // Update order numbers
    const updatedComponents = newComponents.map((comp, index) => ({
      ...comp,
      order: index + 1,
    }));

    setConfig({
      ...config,
      [pageType === 'page2' ? 'page2Components' : 'page3Components']: updatedComponents,
    });
    
    console.log('Component removed successfully');
  };

  const handleSave = async () => {
    if (!config) return;

    setSaving(true);
    try {
      await configApi.updateConfig({
        page2Components: config.page2Components,
        page3Components: config.page3Components,
      });
      setMessage('Configuration saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save config:', error);
      setMessage('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Failed to load configuration</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="mt-2 text-gray-600">
            Configure the onboarding flow components and their order.
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Page 2 Configuration */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Page 2 Components</h2>
              <p className="text-sm text-gray-500 mt-1">Each page must have at least one component</p>
            </div>
            
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, 'page2')}
            >
              <SortableContext
                items={config.page2Components.map((_, index) => `page2-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 min-h-[100px]">
                  {config.page2Components.map((component, index) => (
                    <SortableItem
                      key={`page2-${index}`}
                      id={`page2-${index}`}
                      onRemove={() => removeComponent('page2', index)}
                      canRemove={config.page2Components.length > 1}
                    >
                      {getComponentLabel(component.type)}
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Add Component:</h3>
              <div className="flex flex-wrap gap-2">
                {availableComponents.map((componentType) => {
                  const isAvailable = isComponentAvailable('page2', componentType);
                  const isOnCurrentPage = config.page2Components.some(comp => comp.type === componentType);
                  const isOnOtherPage = config.page3Components.some(comp => comp.type === componentType);
                  
                  return (
                    <button
                      key={componentType}
                      onClick={() => addComponent('page2', componentType)}
                      disabled={!isAvailable}
                      className={`px-3 py-1 text-sm rounded-md ${
                        isOnCurrentPage
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : isOnOtherPage
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      }`}
                      title={
                        isOnCurrentPage
                          ? 'Already added to this page'
                          : isOnOtherPage
                          ? 'Already used on Page 3'
                          : 'Add to Page 2'
                      }
                    >
                      {isOnCurrentPage ? '✓ ' : isOnOtherPage ? '✗ ' : '+ '}{getComponentLabel(componentType)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Page 3 Configuration */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Page 3 Components</h2>
              <p className="text-sm text-gray-500 mt-1">Each page must have at least one component</p>
            </div>
            
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, 'page3')}
            >
              <SortableContext
                items={config.page3Components.map((_, index) => `page3-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 min-h-[100px]">
                  {config.page3Components.map((component, index) => (
                    <SortableItem
                      key={`page3-${index}`}
                      id={`page3-${index}`}
                      onRemove={() => removeComponent('page3', index)}
                      canRemove={config.page3Components.length > 1}
                    >
                      {getComponentLabel(component.type)}
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Add Component:</h3>
              <div className="flex flex-wrap gap-2">
                {availableComponents.map((componentType) => {
                  const isAvailable = isComponentAvailable('page3', componentType);
                  const isOnCurrentPage = config.page3Components.some(comp => comp.type === componentType);
                  const isOnOtherPage = config.page2Components.some(comp => comp.type === componentType);
                  
                  return (
                    <button
                      key={componentType}
                      onClick={() => addComponent('page3', componentType)}
                      disabled={!isAvailable}
                      className={`px-3 py-1 text-sm rounded-md ${
                        isOnCurrentPage
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : isOnOtherPage
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      }`}
                      title={
                        isOnCurrentPage
                          ? 'Already added to this page'
                          : isOnOtherPage
                          ? 'Already used on Page 2'
                          : 'Add to Page 3'
                      }
                    >
                      {isOnCurrentPage ? '✓ ' : isOnOtherPage ? '✗ ' : '+ '}{getComponentLabel(componentType)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* Legend */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Button Legend:</h4>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center px-2 py-1 rounded bg-indigo-100 text-indigo-700">+ Component</span>
                <span className="text-gray-600">Available to add</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-700">✓ Component</span>
                <span className="text-gray-600">Already on this page</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-400">✗ Component</span>
                <span className="text-gray-600">Used on other page</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Onboarding
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Check, X, Eye, Clock, FileText, Video, File, ExternalLink, ChevronDown, ChevronUp, Search } from 'lucide-react';
import {Course, mockDatabase} from "@/utils/mock-course";

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Simulate fetching courses from database
  useEffect(() => {
    fetchPendingCourses();
  }, []);

  const fetchPendingCourses = async () => {
    try {
      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Filter courses with pending_review status
      const pendingCourses = mockDatabase.filter(
        course => course.status === 'pending_review'
      );

      setCourses(pendingCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleApprove = async (courseId: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Find course index in mockDatabase
      const courseIndex = mockDatabase.findIndex(c => c.id === courseId);

      if (courseIndex !== -1) {
        // Update status to 'published'
        mockDatabase[courseIndex].status = 'published';
        mockDatabase[courseIndex].moderationNotes = selectedCourse?.moderationNotes || '';

        // Remove from local state
        setCourses(courses.filter(c => c.id !== courseId));
        setSelectedCourse(null);

        alert('✅ Course approved and published successfully!');
      }
    } catch (error) {
      console.error('Error approving course:', error);
      alert('❌ Failed to approve course');
    }
  };

  const handleReject = async (courseId: string, notes: string) => {
    if (!notes.trim()) {
      alert('⚠️ Please provide rejection notes for the instructor');
      return;
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Find course index in mockDatabase
      const courseIndex = mockDatabase.findIndex(c => c.id === courseId);

      if (courseIndex !== -1) {
        // Update status to 'draft' and save notes
        mockDatabase[courseIndex].status = 'draft';
        mockDatabase[courseIndex].moderationNotes = notes;

        // Remove from local state
        setCourses(courses.filter(c => c.id !== courseId));
        setSelectedCourse(null);

        alert('✅ Course rejected. Instructor will be notified with your feedback.');
      }
    } catch (error) {
      console.error('Error rejecting course:', error);
      alert('❌ Failed to reject course');
    }
  };

  const getLectureIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'file': return <File className="w-4 h-4" />;
      case 'external': return <ExternalLink className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Course Moderation</h1>
              <p className="text-sm text-gray-600 mt-1">Review and approve instructor content</p>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-orange-600 font-medium">Pending Review</p>
                <p className="text-lg font-bold text-orange-700">{filteredCourses.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-200 max-h-[calc(100vh-280px)] overflow-y-auto">
                {filteredCourses.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">No pending courses</p>
                  </div>
                ) : (
                  filteredCourses.map(course => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        selectedCourse?.id === course.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-20 h-14 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-gray-900 truncate">
                            {course.title}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">by {course.instructor}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">{course.category}</span>
                            <span className="text-xs font-semibold text-green-600">${course.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                        <span className="text-xs text-gray-500">{course.submittedAt}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Course Detail */}
          <div className="lg:col-span-2">
            {!selectedCourse ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Eye className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Course to Review</h3>
                <p className="text-gray-600">Choose a course from the list to view details and moderate content</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Course Header */}
                <div className="p-6 border-b border-gray-200">
                  <img
                    src={selectedCourse.thumbnail}
                    alt={selectedCourse.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h2>
                      <p className="text-gray-600 mb-3">{selectedCourse.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Instructor:</span>
                          <span className="ml-2 font-medium text-gray-900">{selectedCourse.instructor}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Category:</span>
                          <span className="ml-2 font-medium text-gray-900">{selectedCourse.category}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Price:</span>
                          <span className="ml-2 font-medium text-green-600">${selectedCourse.price}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Language:</span>
                          <span className="ml-2 font-medium text-gray-900">{selectedCourse.language.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Curriculum */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Curriculum</h3>
                  <div className="space-y-2">
                    {selectedCourse.sections.map((section, idx) => (
                      <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500">Section {idx + 1}</span>
                            <span className="font-semibold text-gray-900">{section.title}</span>
                            <span className="text-xs text-gray-500">({section.lectures.length} lectures)</span>
                          </div>
                          {expandedSections[section.id] ?
                            <ChevronUp className="w-5 h-5 text-gray-500" /> :
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          }
                        </button>
                        {expandedSections[section.id] && (
                          <div className="divide-y divide-gray-100">
                            {section.lectures.map((lecture, lecIdx) => (
                              <div key={lecture.id} className="flex items-center justify-between p-3 pl-8 bg-white hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-gray-400">{lecIdx + 1}</span>
                                  {getLectureIcon(lecture.type)}
                                  <span className="text-sm text-gray-900">{lecture.title}</span>
                                </div>
                                {lecture.duration && (
                                  <span className="text-xs text-gray-500">{lecture.duration}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Moderation Notes */}
                <div className="p-6 border-b border-gray-200">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Moderation Notes (Optional for approval, required for rejection)
                  </label>
                  <textarea
                    value={selectedCourse.moderationNotes}
                    onChange={(e) => setSelectedCourse({...selectedCourse, moderationNotes: e.target.value})}
                    placeholder="Add notes about quality, content issues, or reasons for rejection..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="p-6 bg-gray-50 flex gap-3">
                  <button
                    onClick={() => handleReject(selectedCourse.id, selectedCourse.moderationNotes)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-red-500 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    Reject Course
                  </button>
                  <button
                    onClick={() => handleApprove(selectedCourse.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                    Approve & Publish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
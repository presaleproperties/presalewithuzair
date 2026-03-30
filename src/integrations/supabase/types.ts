export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          category_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          budget: string | null
          buyer_type: string
          created_at: string
          email: string
          first_name: string
          has_agent: string | null
          id: string
          is_paid: boolean | null
          landing_page: string | null
          last_name: string
          lead_source: string | null
          payment_intent_id: string | null
          phone: string
          preferred_call_date: string | null
          preferred_call_time: string | null
          referrer: string | null
          status: string
          timeline: string | null
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          budget?: string | null
          buyer_type: string
          created_at?: string
          email: string
          first_name: string
          has_agent?: string | null
          id?: string
          is_paid?: boolean | null
          landing_page?: string | null
          last_name: string
          lead_source?: string | null
          payment_intent_id?: string | null
          phone: string
          preferred_call_date?: string | null
          preferred_call_time?: string | null
          referrer?: string | null
          status?: string
          timeline?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          budget?: string | null
          buyer_type?: string
          created_at?: string
          email?: string
          first_name?: string
          has_agent?: string | null
          id?: string
          is_paid?: boolean | null
          landing_page?: string | null
          last_name?: string
          lead_source?: string | null
          payment_intent_id?: string | null
          phone?: string
          preferred_call_date?: string | null
          preferred_call_time?: string | null
          referrer?: string | null
          status?: string
          timeline?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      presale_projects: {
        Row: {
          address: string | null
          amenities: Json | null
          brochure_files: Json | null
          city: string | null
          completion_month: number | null
          completion_year: number | null
          created_at: string | null
          deposit_percent: number | null
          deposit_structure: string | null
          developer_name: string | null
          faq: Json | null
          featured_image: string | null
          floorplan_files: Json | null
          full_description: string | null
          gallery_images: Json | null
          highlights: Json | null
          id: string
          incentives: string | null
          incentives_available: boolean | null
          is_featured: boolean | null
          is_published: boolean | null
          map_lat: number | null
          map_lng: number | null
          name: string
          near_skytrain: boolean | null
          neighborhood: string | null
          occupancy_estimate: string | null
          price_range: string | null
          project_type: string | null
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          source_id: string | null
          starting_price: number | null
          status: string | null
          strata_fees: string | null
          unit_mix: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          address?: string | null
          amenities?: Json | null
          brochure_files?: Json | null
          city?: string | null
          completion_month?: number | null
          completion_year?: number | null
          created_at?: string | null
          deposit_percent?: number | null
          deposit_structure?: string | null
          developer_name?: string | null
          faq?: Json | null
          featured_image?: string | null
          floorplan_files?: Json | null
          full_description?: string | null
          gallery_images?: Json | null
          highlights?: Json | null
          id?: string
          incentives?: string | null
          incentives_available?: boolean | null
          is_featured?: boolean | null
          is_published?: boolean | null
          map_lat?: number | null
          map_lng?: number | null
          name: string
          near_skytrain?: boolean | null
          neighborhood?: string | null
          occupancy_estimate?: string | null
          price_range?: string | null
          project_type?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          source_id?: string | null
          starting_price?: number | null
          status?: string | null
          strata_fees?: string | null
          unit_mix?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          address?: string | null
          amenities?: Json | null
          brochure_files?: Json | null
          city?: string | null
          completion_month?: number | null
          completion_year?: number | null
          created_at?: string | null
          deposit_percent?: number | null
          deposit_structure?: string | null
          developer_name?: string | null
          faq?: Json | null
          featured_image?: string | null
          floorplan_files?: Json | null
          full_description?: string | null
          gallery_images?: Json | null
          highlights?: Json | null
          id?: string
          incentives?: string | null
          incentives_available?: boolean | null
          is_featured?: boolean | null
          is_published?: boolean | null
          map_lat?: number | null
          map_lng?: number | null
          name?: string
          near_skytrain?: boolean | null
          neighborhood?: string | null
          occupancy_estimate?: string | null
          price_range?: string | null
          project_type?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          source_id?: string | null
          starting_price?: number | null
          status?: string | null
          strata_fees?: string | null
          unit_mix?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
